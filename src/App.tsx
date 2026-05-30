import { Admin, Create, EditGuesser, ListGuesser, Resource, ShowGuesser } from "react-admin";
import { Layout } from "./Layout";
import jsonServerProvider from "ra-data-json-server";
import { EmployeeList } from "./employees/EmployeeList";
import { EmployeeEdit } from "./employees/EmployeeEdit";
import { EmployeeShow } from "./employees/EmployeeShow";
import { EmployeeCreate } from "./employees/EmployeeCreate";
import { InterneList } from "./Internes/InterneList";
import { InterneCreate } from "./Internes/InterneCreate";

const dataProvider = jsonServerProvider("http://localhost:3002");

export const App = () => (
  <Admin layout={Layout} dataProvider={dataProvider}>
    <Resource
      name="employees"
      list={EmployeeList}
      create={EmployeeCreate}
      edit={EmployeeEdit}
      show={EmployeeShow}
    />
    <Resource
    name="internes"
    list={InterneList}
    create={InterneCreate}
    edit={EditGuesser}
    show={ShowGuesser}
    />
  </Admin>
);
