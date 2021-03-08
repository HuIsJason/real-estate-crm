interface TableProps {
  projects: Project[];
  onSelect: (projectId: number) => void;
}

interface Project {
  id: number,
  name: string, 
  active: boolean
}

interface AddProjectModalProps {
  open: boolean, 
  onCancel: () => void, 
  onContinue: (projectName: string) => void,
}

export default TableProps;
export type { AddProjectModalProps };
