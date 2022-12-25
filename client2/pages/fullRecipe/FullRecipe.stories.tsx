import { ComponentMeta, ComponentStory } from '@storybook/react';
import FullRecipe from '.';

export default {
  title: 'templates/FullRecipe',
  component: FullRecipe,
  argTypes: {},
} as ComponentMeta<typeof FullRecipe>;

const Template: ComponentStory<typeof FullRecipe> = (args) => (
  <FullRecipe {...args} />
);

export const Base = Template.bind({});
