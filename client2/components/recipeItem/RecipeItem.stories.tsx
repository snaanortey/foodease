import { ComponentMeta, ComponentStory } from '@storybook/react';
import RecipeItem from './RecipeItem';

export default {
  title: 'templates/RecipeItem',
  component: RecipeItem,
  argTypes: {},
} as ComponentMeta<typeof RecipeItem>;

const Template: ComponentStory<typeof RecipeItem> = (args) => (
  <RecipeItem {...args} />
);

export const Base = Template.bind({});
