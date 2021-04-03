import { Project } from "../../utils/types";

interface TableProps {
  projects: Project[];
  onSelect: (projectId: string) => void;
}

interface AddProjectModalProps {
  open: boolean, 
  onCancel: () => void, 
  onContinue: (projectName: string) => void,
}

export default TableProps;
export type { AddProjectModalProps };
