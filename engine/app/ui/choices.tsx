import { Fragment } from "react";

interface ChoicesProps {
    choices: JSX.Element[];
}

export default function Choices(props: ChoicesProps) {
    const { choices } = props;

    return (
        <ol>
            {choices.map((choice, index) => <Fragment key={index}>{choice}</Fragment>)}
        </ol>
    );
}
