export type EditableListItemProps = {
  value: string;
  label?: string;
  onBlur?: (value: string, setEditMode: (isEditMode: boolean) => void) => void;
};
