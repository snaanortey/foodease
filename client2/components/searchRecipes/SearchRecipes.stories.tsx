import { ComponentMeta, ComponentStory } from '@storybook/react';
import SearchIngredient from './SearchRecipes';

export default {
  title: 'templates/SearchIngredient',
  component: SearchIngredient,
  argTypes: {},
} as ComponentMeta<typeof SearchIngredient>;

const Template: ComponentStory<typeof SearchIngredient> = (args) => (
  <SearchIngredient {...args} />
);

export const Base = Template.bind({});
