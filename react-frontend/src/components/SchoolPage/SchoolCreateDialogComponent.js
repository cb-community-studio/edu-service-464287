
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import client from "../../services/restClient";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';


 
const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = [];
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const SchoolCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        set_entity({})
    },[props.show])
    const onSave = async () => {
        let _data = {
            schoolName: _entity.schoolName,
            env: _entity.env,
            levelEdu: _entity.levelEdu,
            totalStudent: _entity.totalStudent,
            type: _entity.type,
            state: _entity.state,
            isBoarding: _entity.isBoarding

        };

        setLoading(true);
        try {
            const result = await client.service("school").create(_data);
            props.onHide();
            props.alert({ type: "success", title: "Create", message: "Created successfully" });
            props.onCreateResult(result);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create" });
        }
        setLoading(false);
    };

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError("");
    };

    return (
        <Dialog header="Create" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div role="school-create-dialog-component">
                <div>
                    <p className="m-0" >School Name:</p>
                    <InputText className="w-full mb-3" value={_entity?.schoolName} onChange={(e) => setValByKey("schoolName", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Environment:</p>
                    <InputText className="w-full mb-3" value={_entity?.env} onChange={(e) => setValByKey("env", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Level of Education:</p>
                    <InputText className="w-full mb-3" value={_entity?.levelEdu} onChange={(e) => setValByKey("levelEdu", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Total Students:</p>
                    <InputText type="number" className="w-full mb-3" value={_entity?.totalStudent} onChange={(e) => setValByKey("totalStudent", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >School Type:</p>
                    <InputText className="w-full mb-3" value={_entity?.type} onChange={(e) => setValByKey("type", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >State:</p>
                    <InputText className="w-full mb-3" value={_entity?.state} onChange={(e) => setValByKey("state", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Boarding:</p>
                    <Checkbox checked={_entity?.isBoarding} onChange={ (e) => setValByKey("isBoarding", e.checked)}  ></Checkbox>
                </div>


                <small className="p-error">
                    {Array.isArray(error)
                        ? error.map((e, i) => (
                              <p className="m-0" key={i}>
                                  {e}
                              </p>
                          ))
                        : error}
                </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    //
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(null, mapDispatch)(SchoolCreateDialogComponent);
// createDialog_code.template
