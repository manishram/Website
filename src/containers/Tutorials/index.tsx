import React, {FC, ReactNode, useCallback, useEffect, useMemo, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';

import {BreadcrumbMenu, EmptyPage, FlatNavLinks, PageTitle} from 'components';
import {NavOption} from 'types/option';
import {OpeningCategory, OpeningsUrlParams} from 'types/openings';

import OpeningDetails from './OpeningDetails';
import OpeningsOpening from './OpeningsOpening';
import './Tutorials.scss';

const tutorials = getTutorials();

const TUTORIAL_CATEGORY_FILTERS: NavOption[] = [
  {pathname: TutorialCategory.all, title: 'All'},
  {pathname: TutorialCategory.backend, title: 'Back-End Developers'},
  {pathname: TutorialCategory.crypto, title: 'Crypto Currency'},
  {pathname: TutorialCategory.design, title: 'Design'},
  {pathname: TutorialCategory.frontend, title: 'Front-End Developers'},
];

const Tutorials: FC = () => {
  const history = useHistory();
  const {category: categoryParam, openingId: openingIdParam} = useParams<OpeningsUrlParams>();
  const [categoryFilter, setCategoryFilter] = useState<OpeningCategory>(OpeningCategory.all);

  useEffect(() => {
    setCategoryFilter(categoryParam);
  }, [categoryParam]);

  const filteredOpenings = useMemo(
    () =>
      categoryFilter === OpeningCategory.all ? openings : openings.filter(({category}) => category === categoryFilter),
    [categoryFilter],
  );

  const opening = useMemo(
    () => openings.find(({category, openingId}) => category === categoryParam && openingId === openingIdParam) || null,
    [categoryParam, openingIdParam],
  );

  const handleNavOptionClick = useCallback(
    (option: OpeningCategory) => (): void => {
      history.push(`/openings/${option}`);
    },
    [history],
  );

  const renderCategoryFilter = (): ReactNode => {
    return (
      <FlatNavLinks
        handleOptionClick={handleNavOptionClick}
        options={TUTORIAL_CATEGORY_FILTERS}
        selectedOption={categoryFilter}
      />
    );
  };

  const renderOpenings = (): ReactNode => {
    if (!filteredOpenings.length) return <EmptyPage />;
    return filteredOpenings.map(({category, description, openingId, position, project}) => (
      <OpeningsOpening
        category={category}
        description={description}
        key={openingId}
        openingId={openingId}
        position={position}
        project={project}
      />
    ));
  };

  const renderOpeningDetails = (): ReactNode => {
    if (!opening) return <EmptyPage />;
    return <OpeningDetails opening={opening} />;
  };

  return (
    <>
      <PageTitle title="Openings" />
      <div className="Openings">
        <BreadcrumbMenu
          className="Openings__BreadcrumbMenu"
          menuItems={renderCategoryFilter()}
          pageName={categoryFilter}
          sectionName="Open Positions"
        />
        <div className="Openings__left-menu">{renderCategoryFilter()}</div>
        {openingIdParam ? (
          <div className="Openings__opening-details">{renderOpeningDetails()}</div>
        ) : (
          <div className="Openings__opening-list">
            <h1 className="Openings__opening-list-heading">
              {TutorialCategory === TutorialCategory.all ? 'All' : TutorialCategory}
            </h1>
            {renderOpenings()}
          </div>
        )}
      </div>
    </>
  );
};

export default Tutorials;
