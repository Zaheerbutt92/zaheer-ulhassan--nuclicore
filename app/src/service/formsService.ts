import uof from "../data/uof";
import { Form } from "../models/form";

export default class {
  static async getAllForms(): Promise<Form[]> {
    var query = "SELECT * FROM Forms";
    const forms = await uof.all(query, []);
    return <Form[]>forms;
  }

  static async getFormById(id: string): Promise<Form> {
    var query = "SELECT * FROM Forms WHERE ID = ?";
    const form = await uof.get(query, [id]);
    return <Form>form;
  }

  static async createForm(form: Form): Promise<boolean> {
    const command = `INSERT INTO Forms (ID, FormName, FormData, Date) VALUES (?,?,?,?);`;
    try {
      await uof.run(command, [form.id, form.formName, form.formData,form.date]);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  static async updateForm(form: Form): Promise<boolean> {
    const command = `UPDATE Forms SET FormName = ?, FormData= ?, Date=? WHERE ID = ?;`;
    try {
      await uof.run(command, [form.formName, form.formData,form.date,form.id]);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  static async deleteForm(id: string) {
    const command = `DELETE FROM Forms WHERE ID = ?;`;
    try {
      await uof.run(command, [id]);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
