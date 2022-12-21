import { ComponentStory, ComponentMeta } from '@storybook/react';
import SearchIngredient, { ISearchIngredient } from './SearchIngredient';

export default {
  title: 'templates/SearchIngredient',
  component: SearchIngredient,
  argTypes: {},
} as ComponentMeta<typeof SearchIngredient>;

const Template: ComponentStory<typeof SearchIngredient> = (args) => (
  <SearchIngredient {...args} />
);

export const Base = Template.bind({});
