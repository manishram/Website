import React, {FC} from 'react';

import {A} from 'components';

import './TutorialCard.scss';

interface ComponentProps {
  thumbnail: string;
  tutorialTitle: string;
  tutorialAuthor: string;
  tutorialNoOfVideo: string;
  tutorialDuration: string;
}

const TutorialCard: FC<ComponentProps> = ({
  thumbnail,
  tutorialTitle,
  tutorialAuthor,
  tutorialNoOfVideo,
  tutorialDuration,
}) => {
  const renderThumbnail = () => <img alt={tutorialTitle} className="TutorialCard__thumbnail" src={thumbnail} />;
  const renderTutorialDetails = () => (
    <div className="TutorialCard__details">
      <h4 className="TutorialCard__details-name">{tutorialTitle}</h4>
      <>
        Author: <A href="https://www.youtube.com/user/thenewboston">{tutorialAuthor}</A>
      </>
      <div className="TutorialCard__details-more-info">
        {`${tutorialNoOfVideo} Videos - `}
        {tutorialDuration}
      </div>
    </div>
  );

  return (
    <div className="TutorialCard">
      {renderThumbnail()}
      {renderTutorialDetails()}
    </div>
  );
};

export default TutorialCard;
