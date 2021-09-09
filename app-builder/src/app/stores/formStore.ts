import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Form } from "../models/form";

export default class FormStore {
  formRegistry = new Map<string, Form>();
  selectedForm: Form | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = true;

  constructor() {
    makeAutoObservable(this);
  }

  get formsByDate(){
    return Array.from(this.formRegistry.values()).sort((a,b)=>
    Date.parse(a.date)- Date.parse(b.date));
  }

  loadForms = async () => {
    this.loadingInitial = true;
    try {
      const forms = await agent.Forms.list();
      forms?.data?.forEach((form) => {
        this.setForm(form);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  loadForm = async (id:string) => {
    let form = this.getForm(id);
    if(form){
      this.selectedForm = form;
      return form;
    }
    else{
      this.loadingInitial = true;
      try {
         form =await (await agent.Forms.details(id)).data;
         if(form){
           this.setForm(form);
           runInAction(()=>{
             this.selectedForm = form;
           })
         }
         this.setLoadingInitial(false);
         return form
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  }

  private setForm = (form:Form) =>{
    form.date = form.date?.split("T")[0];
    form.fields = JSON.parse(form.formData);
    
    this.formRegistry.set(form.id,form);
  }

  private getForm = (id:string) =>{
    return this.formRegistry.get(id);
  }

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  createForm = async (form: Form) => {
    this.loading = true;
    form.formData =JSON.stringify(form.fields).toString();
    try {
      await agent.Forms.create(form);
      runInAction(() => {
        this.formRegistry.set(form.id, form);
        this.selectedForm = form;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateForm = async (form: Form) => {
    this.loading = true;
    form.formData =JSON.stringify(form.fields).toString();
    try {
      await agent.Forms.update(form);
      runInAction(() => {
        this.formRegistry.set(form.id, form);
        this.selectedForm = form;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  deleteForm = async (id: string) => {
    this.loading = true;
    try {
      await agent.Forms.delete(id);
      runInAction(() => {
        this.formRegistry.delete(id);
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
