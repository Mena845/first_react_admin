import { Admin, EditGuesser, Resource } from "react-admin";
import { Layout } from "./Layout";
import jsonServerProvider from "ra-data-json-server";
import { Dashboard } from "./Dashboard";
import { EmployeeList } from "./employees/EmployeeList";
import { EmployeeEdit } from "./employees/EmployeeEdit";
import { EmployeeShow } from "./employees/EmployeeShow";
import { EmployeeCreate } from "./employees/EmployeeCreate";
import { InternList } from "./interns/InternList";
import { InternCreate } from "./interns/InternCreate";
import { InternShow } from "./interns/InternShow";

const dataProvider = jsonServerProvider("http://localhost:3002");

export const App = () => (
  <Admin dashboard={Dashboard} layout={Layout} dataProvider={dataProvider}>
    <Resource
      name="employees"
      list={EmployeeList}
      create={EmployeeCreate}
      edit={EmployeeEdit}
      show={EmployeeShow}
    />
    <Resource
      name="interns"
      list={InternList}
      create={InternCreate}
      edit={EditGuesser}
      show={InternShow}
    />
  </Admin>
);
