import '../src/index.css';

//registres msw addon
import {initialize, mswDecorator} from 'msw-storybook-addon';

//initialize msw
initialize();

//provide the msw addon decorator globally
export const decorators = [mswDecorator];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}