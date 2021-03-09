interface TableProps {
  displayPage: number;
  onClickNext: () => void;
  onClickPrev: () => void;
  addActivity: (activity: Activity) => void;
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

export default TableProps;
export type { TableRowProps, Activity, ActivityDetailModalProps, AddModalProps } ;
