import React, {FC, memo} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {TutorialCategory} from 'types/tutorials';
import TutorialCard from '../TutorialCard';

import './TutorialsTutorial.scss';

interface ComponentProps {
  category: TutorialCategory;
  tutorialId: string;
}

const TutorialsTutorial: FC<ComponentProps> = ({category, tutorialId}) => {
  const location = useLocation();

  return (
    <Link
      className="TutorialsTutorial"
      to={{pathname: `/tutorials/${category}/${tutorialId}`, state: {from: location.pathname}}}
    >
      <TutorialCard
        thumbnail={
          'https://i.ytimg.com/vi/W9YGfOEgPLU/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBpUoybN4kph9rmP0nuTYhYrISsBQ'
        }
        tutorialTitle={'Spring Boot Tutorial with Kotlin'}
        tutorialAuthor={'thenewboston'}
        tutorialNoOfVideo={'7'}
        tutorialDuration={'45 min'}
      />
    </Link>
  );
};

export default memo(TutorialsTutorial);
