import React from 'react';
import { storiesOf } from '@storybook/react';

import { Movies } from '../src/Movies';

storiesOf('Movies', module)
  .add('storybook', () => <Movies/>);