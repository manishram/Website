import React, {FC, ReactNode, useCallback, useEffect, useMemo, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';

import {BreadcrumbMenu, EmptyPage, FlatNavLinks, PageTitle} from 'components';
import {getTutorials} from 'utils/data';
import {NavOption} from 'types/option';
import {TutorialCategory, TutorialUrlParams} from 'types/tutorials';
import YouTube from 'react-youtube';
import TutorialsTutorial from './TutorialsTutorial';
import './Tutorials.scss';

const tutorials = getTutorials();

const TUTORIAL_CATEGORY_FILTERS: NavOption[] = [
  {pathname: TutorialCategory.all, title: 'All'},
  {pathname: TutorialCategory.backend, title: 'Back-End Developers'},
  {pathname: TutorialCategory.crypto, title: 'Crypto Currency'},
  {pathname: TutorialCategory.design, title: 'Design'},
  {pathname: TutorialCategory.frontend, title: 'Front-End Developers'},
  {pathname: TutorialCategory.gitOrgihub, title: 'Git / Github'},
  {pathname: TutorialCategory.math, title: 'Math'},
  {pathname: TutorialCategory.mobileDev, title: 'Mobile Development'},
  {pathname: TutorialCategory.programming, title: 'Programming'},
  {pathname: TutorialCategory.science, title: 'Science'},
  {pathname: TutorialCategory.security, title: 'Security'},
];

const Tutorials: FC = () => {
  const history = useHistory();
  const {category: categoryParam, tutorialId: tutorialIdParam} = useParams<TutorialUrlParams>();
  const [categoryFilter, setCategoryFilter] = useState<TutorialCategory>(TutorialCategory.all);

  useEffect(() => {
    setCategoryFilter(categoryParam);
  }, [categoryParam]);

  const filteredTutorials = useMemo(
    () =>
      categoryFilter === TutorialCategory.all
        ? tutorials
        : tutorials.filter(({category}) => category === categoryFilter),
    [categoryFilter],
  );

  // const tutorial = useMemo(
  //   () =>
  //     tutorials.find(({category, tutorialId}) => category === categoryParam && tutorialId === tutorialIdParam) || null,
  //   [categoryParam, tutorialIdParam],
  // );

  const handleNavOptionClick = useCallback(
    (option: TutorialCategory) => (): void => {
      history.push(`/tutorials/${option}`);
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

  const renderTutorials = (): ReactNode => {
    if (!filteredTutorials.length) return <EmptyPage />;
    return filteredTutorials.map(({category, tutorialId}) => (
      <TutorialsTutorial category={category} tutorialId={tutorialId} />
    ));
  };

  return (
    <>
      <PageTitle title="Tutorials" />
      <div className="Tutorials">
        <BreadcrumbMenu
          className="Tutorials__BreadcrumbMenu"
          menuItems={renderCategoryFilter()}
          pageName={categoryFilter}
          sectionName="Tutorials"
        />
        <div className="Tutorials__left-menu">{renderCategoryFilter()}</div>
        {tutorialIdParam ? (
          <div className="Tutorials__tutorial-watch">
            <YouTube
              videoId="W9YGfOEgPLU"
              opts={{
                height: '390',
                playerVars: {
                  autoplay: 1,
                },
                width: '640',
              }}
            />
            <div className="Tutorials__right-playlist">Playlist</div>
          </div>
        ) : (
          <div className="Tutorials__tutorial-list-panel">
            <h1 className="Tutorials__tutorial-list-heading">
              {categoryFilter === TutorialCategory.all ? 'All' : categoryFilter}
            </h1>
            <div className="Tutorials__tutorial-list">{renderTutorials()}</div>
          </div>
        )}
      </div>
    </>
  );
};

export default Tutorials;
