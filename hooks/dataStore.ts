import { TransactionType } from "@/types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const dataStore = (set: any) => ({
	financialData: [],
	addTransaction: (transaction: TransactionType[]) => {
		set((state: any) => ({
			financialData: [transaction, ...state.financialData]
		}));
	},
	clearTransaction: () => {
		set((state: any) => ({
			financialData: []
		}));
	}
});

const useDataStore = create(
	devtools(
		persist(dataStore, {
			name: "financialData"
		})
	)
);

export default useDataStore;
