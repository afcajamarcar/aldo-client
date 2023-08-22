export type InventoryInfo = {
  store: string;
  model: string;
  inventory: string | undefined;
}

export type Notification = InventoryInfo & {
  notification?: string;
}
