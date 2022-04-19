import { useState } from "@storybook/addons";
import React from "react";
import { Button } from './Button';

import { within, userEvent } from '@storybook/testing-library';

export default {
    /**
     * сво-во title - опционально
     */
    title: 'My Stories/Button/My Story For Button',
    component: Button,
    //создание специфичных параметров для стори
    parameters: {
        backgrounds: {
            values: [
                { name: 'white', value: '#fff' },
                { name: 'red', value: '#f00' },
                { name: 'green', value: '#0f0' },
                { name: 'blue', value: '#00f' },
            ]
        },
    },
    decorators: [
        (Story) => (
            <div style={{margin: '3em'}}>
                <Story />
            </div>
        )
    ],
    args: {
        backgroundColor: '#c8c5e1'
    }
}

//использование аргументов
//создается "шаблон" как аргументы мапятся для рендеринга
const Template = (args) => <Button {...args} />

//defining stories
export const Primary = (args, { loaded: { data } }) => {
    //работа с react hook
    const [value, setValue] = useState('Secondary');
    const [isPrimary, setIsPrimary] = useState(false);

    //устанавливает хэндлер для измнения значения лейбла
    const handleOnChange = () => {
        if (!isPrimary) {
            setIsPrimary(true);
            setValue('Primary');
        } else {
            setIsPrimary(false);
            setValue('Secondary');
        }
    }

    return <Button  
        primary={isPrimary} 
        onClick={handleOnChange} 
        label={data.title} 
    />
}
Primary.storyName = 'Primary button story';
Primary.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    userEvent.click(canvas.getByRole('button'));
    const button = canvas.getByRole('button');
    await userEvent.type(button, 'random string', {delay: 100});
}
Primary.parameters = {
    backgrounds: {
        values: [
            { name: 'violet', value: '#c8c5e1' },
            { name: 'red', value: '#f00' },
            { name: 'green', value: '#0f0' },
            { name: 'blue', value: '#00f' },
        ]
    }
}
Primary.decorators = [
    (Story) => (
        <div style={{margin: '5em'}}>
            <Story />
        </div>
    )
];
Primary.loaders = [
    async () => ({
      data: await (await fetch('https://jsonplaceholder.typicode.com/todos/1')).json(),
    }),
];

export const GoodEmogies = Template.bind({});
GoodEmogies.args = {backgroundColor: '#ff0', label: '😄👍😍💯' }

export const BusinessEmogies = Template.bind({});
BusinessEmogies.args = { ...GoodEmogies.args, label: '📚📕📈🤓' }