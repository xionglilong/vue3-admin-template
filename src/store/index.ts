
import { InjectionKey } from "vue";
import { createStore,Store,useStore as baseUseStore } from "vuex";
import { AuthState,authStore } from "./modules/auth";
import {tabStore,TabState} from './modules/tabs'

export interface RootState{
    tabStore:TabState,
    authStore:AuthState
}

export const key:InjectionKey<Store<RootState>> = Symbol()


export const store:Store<RootState> = createStore({
    modules:{
        tabStore,
        authStore
    }
})

//自定义组合式函数
export function useStore(){
  return baseUseStore(key)
}