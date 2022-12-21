import { ComponentStory, ComponentMeta } from '@storybook/react';
import Footer, { IFooter } from './Footer';

export default {
  title: 'templates/Footer',
  component: Footer,
  argTypes: {},
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = (args) => <Footer {...args} />;

export const Base = Template.bind({});
