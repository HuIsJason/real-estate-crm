interface BinarySelectorProps {
    options: { value: string, displayName: string }[];
    selection: string;
    setSelection: (selection: string) => void;
}

export default BinarySelectorProps;