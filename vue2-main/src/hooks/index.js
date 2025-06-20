import DrawerDetail from "@/components/DrawerDetail";
import { createPromiseDialog } from "vue-promise-dialogs";

export const openDrawerDetail = await createPromiseDialog(DrawerDetail);
