 export type ColumnType = {
    id: string;
    title: string;
  };

  export type TaskType = {
    id: string;
    title: string;
    description: string;
    status: string;
  };


  export type ColumnBoxProps = {
    columns: ColumnType;
    tasks: TaskType[];
  };