interface TableProps {
  addActivity: (activity: Activity) => void;
  activities: Activity[];
}

interface TableRowProps {
  activityTitle: string;
  date: string;
  onClick: () => void;
}

interface Activity {
  id: number,
  title: string,
  description: string,
  date: string
}

interface ActivityDetailModalProps {
  activity: Activity,
  open: boolean,
  onClose: () => void,
}

interface AddModalProps {
  open: boolean,
  onCancel: () => void,
  onContinue: (activity: Activity) => void

}

export type { TableProps, TableRowProps, Activity, ActivityDetailModalProps, AddModalProps } ;
