import type { PropType, ExtractPropTypes, VNode, Slot, ComponentInternalInstance, SetupContext } from 'vue';
import { DefaultRow } from '../../table-types';
import { TableStore } from '../../store/store-types';

// eslint-disable-next-line no-use-before-define
export type Formatter = (row: DefaultRow, column: Column, cellValue: any, rowIndex: number) => VNode;

export type SortMethod<T = any> = (a: T, b: T) => boolean;

export type ColumnType = 'checkable' | 'index' | '';

export type SortDirection = 'ASC' | 'DESC' | '';

export interface FilterConfig {
  name: string;
  value: any;
  checked?: boolean;
}

export const tableColumnProps = {
  type: {
    type: String as PropType<ColumnType>,
    default: '',
  },
  header: {
    type: String,
  },
  field: {
    type: String,
    default: '',
  },
  width: {
    type: [String, Number],
    default: '',
  },
  minWidth: {
    type: [String, Number],
    default: 80,
  },
  formatter: {
    type: Function as PropType<Formatter>,
  },
  order: {
    type: Number,
    default: 0,
  },
  sortable: {
    type: Boolean,
    default: false,
  },
  sortDirection: {
    type: String as PropType<SortDirection>,
    default: '',
  },
  sortMethod: {
    type: Function as PropType<SortMethod>,
  },
  filterable: {
    type: Boolean,
    default: false,
  },
  filterMultiple: {
    type: Boolean,
    default: true,
  },
  filterList: {
    type: Array as PropType<FilterConfig[]>,
    default: [],
  },
  fixedLeft: {
    type: String,
  },
  fixedRight: {
    type: String,
  },
};

export type TableColumnProps = ExtractPropTypes<typeof tableColumnProps>;

export interface Column {
  id?: string;
  type?: ColumnType;
  field?: string;
  width?: number;
  minWidth?: number;
  realWidth?: number;
  header?: string;
  order?: number;
  sortable?: boolean;
  sortDirection: SortDirection;
  filterable?: boolean;
  filterMultiple?: boolean;
  filterList?: FilterConfig[];
  fixedLeft?: string;
  fixedRight?: string;
  ctx: SetupContext;
  renderHeader?: (column: Column, store: TableStore) => VNode;
  renderCell?: (rowData: DefaultRow, columnItem: Column, store: TableStore, rowIndex: number) => VNode;
  formatter?: Formatter;
  sortMethod: SortMethod;
  subColumns?: Slot;
}

export interface TableColumn extends ComponentInternalInstance {
  columnId: string;
  columnConfig: Partial<Column>;
}
