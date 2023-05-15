import { useNavigate, useParams } from "react-router-dom"
import { createTodoApi, retrieveTodoApi, updateTodoApi } from "./api/TodoApiService";
import { useAuth } from "./security/AuthContext";
import { useEffect, useState } from "react";
import { Form, Field, Formik, ErrorMessage } from "formik";
import { } from "./api/TodoApiService";
import moment from "moment/moment";

export default function TodoComponent() {
    const { id } = useParams();
    const authContext = useAuth();
    const username = authContext.username;
    const [description, setDescription] = useState('')
    const [targetDate, setTargetDate ] = useState('');  
    const navigate = useNavigate();  
    useEffect(
       () => retrieveTodos(), [id]
    )

    function retrieveTodos() {
        if(id !== -1) {
             retrieveTodoApi(username, id)
                .then(response => {
                    setDescription(response.data.description)
                    setTargetDate(response.data.targetDate)
                }) 
                .catch(error => console.log(error))
        }
    }

    function onSubmit(values) {
        const todo = {
            id : id,
            username : username,
            description : values.description,
            targetDate : values.targetDate,
            done : false
        }

        if(id == -1) {
            createTodoApi(username, todo)
                .then(response => {
                    console.log(response);
                    navigate('/todos')
                })
                .catch(error => console.log(error))
        } else {
            updateTodoApi(username, id, todo)
                .then(response => {
                    console.log(response);
                    navigate('/todos')
                }) 
                .catch(error => console.log(error))
                    console.log(todo);
        }
    }

    function validate(values) {
        let errors = {
        }

        if(values.description.length < 5) {
            errors.description = 'Enter at least 5 charactors'
        }

        if(values.targetDate == null || values.targetDate === '' || !moment(values.targetDate).isValid()) {
            errors.targetDate = 'Enter a target Date'
        }
        return errors;
    }

    return (
      <div className="container">
        <h1>Enter Todo Details</h1>
        <div>
            <Formik initialValues={ {description, targetDate}}
                enableReinitialize = {true}
                onSubmit={ onSubmit }
                validate={ validate }
                validateOnChange = { false }
                validateOnBlur = { true}
            >
                {
                    (props) => (
                        <Form>
                            <ErrorMessage
                                name="description"
                                component="div"
                                className="alert alert-warning"
                            >
                            </ErrorMessage>
                            <ErrorMessage
                                name="targetDate"
                                component="div"
                                className="alert alert-warning"
                            >
                            </ErrorMessage>

                            <fieldset className="form-group">
                                <label>Description</label>
                                <Field type="text" name="description" className="form-control"></Field>
                            </fieldset>
                             <fieldset className="form-group">
                                <label>Target Date</label>
                                <Field type="date" className="form-control" name="targetDate"></Field>
                                <div>
                                    <button className="btn btn-success m-5" type="submit">save</button>
                                </div>
                            </fieldset>
                        </Form>
                    )

                }
            </Formik>
        </div>
      </div>
    )
}
