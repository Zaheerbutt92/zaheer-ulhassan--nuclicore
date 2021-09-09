import { Request, Response, NextFunction } from "express";
import { Form } from "../models/form";
import ApiResponse, { HttpStatusCode } from "../models/response";
import service from "../service/formsService";
import { v4 as uuid } from "uuid";

// getting all forms
const getForms = async (req: Request, res: Response, next: NextFunction) => {
  // get some forms
  const forms: Form[] = await service.getAllForms();
  if (forms) {
    return res.send(new ApiResponse(forms, HttpStatusCode.OK, ""));
  }
  return res.send(
    new ApiResponse(null, HttpStatusCode.NO_CONTENT, "no forms available")
  );
};

// getting a single form
const getForm = async (req: Request, res: Response, next: NextFunction) => {
  // get the form id from the req
  let id: string = req.params.id;
  // get the form
  const form: Form = await service.getFormById(id);
  if (form) {
    return res.send(new ApiResponse(form, HttpStatusCode.OK, ""));
  }
  return res.send(
    new ApiResponse(null, HttpStatusCode.NO_CONTENT, "no form found")
  );
};

// adding a post
const addForm = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.formName || !req.body.formData) {
    return next(
      new ApiResponse(
        null,
        HttpStatusCode.BAD_REQUEST,
        'form name and data are required.'
      )
    );
  }
  const newForm: Form = {
    id: uuid(),
    formName: req.body.formName,
    formData: req.body.formData,
    date: req.body.date
  };
  const success = await service.createForm(newForm);
  if (success) {
    return res.send(new ApiResponse(newForm, HttpStatusCode.OK, "form successfuly saved."));
  }
  return res.send(new ApiResponse(null, HttpStatusCode.Error, "something went wrong"));
};

// updating a form
const updateForm = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.id || !req.body.formName || !req.body.formData) {
    return next(new ApiResponse(
      null,
      HttpStatusCode.BAD_REQUEST,
      'form id, name and data are required.'
    ));
  }

  const updateForm: Form = {
    id: req.body.id,
    formName: req.body.formName,
    formData: req.body.formData,
    date: req.body.date
  };
  const success = await service.updateForm(updateForm);
  if (success) {
    return res.send(new ApiResponse(updateForm, HttpStatusCode.OK, "form successfuly updated."));
  }
  return res.send(new ApiResponse(null, HttpStatusCode.Error, "something went wrong"));
};

// deleting a form
const deleteForm = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.params.id) {
    return next(new ApiResponse(
      null,
      HttpStatusCode.BAD_REQUEST,
      'form id is required.'
    ));
}
let deleted = await service.deleteForm(req.params.id);
if (deleted) {
  return res.send(new ApiResponse(null, HttpStatusCode.OK, "form successfuly deleted."));
}
return res.send(new ApiResponse(null, HttpStatusCode.Error, "something went wrong"));
};

export default { getForms, getForm, addForm ,updateForm, deleteForm };
