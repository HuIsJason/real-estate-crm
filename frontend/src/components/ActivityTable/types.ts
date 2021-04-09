import { Activity } from "../../utils/types";

interface TableProps {
  addActivity: (activity: Activity) => void;
  deleteActivity: (activity: Activity) => void;
  activities: Activity[];
}

interface TableRowProps {
  activityTitle: string;
  date: string;
  onClick: () => void;
}

interface ActivityDetailModalProps {
  activity: Activity,
  open: boolean,
  onClose: () => void,
  handleDelete: () => void,
}

interface AddModalProps {
  open: boolean,
  onCancel: () => void,
  onContinue: (activity: Activity) => void

}

export type { TableProps, TableRowProps, Activity, ActivityDetailModalProps, AddModalProps } ;
