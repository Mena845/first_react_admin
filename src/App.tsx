import { Admin, Resource } from "react-admin";
import { Layout } from "./Layout";
import jsonServerProvider from "ra-data-json-server";
import { Dashboard } from "./Dashboard/Dashboard";

import { EmployeeList } from "./employees/EmployeeList";
import { EmployeeEdit } from "./employees/EmployeeEdit";
import { EmployeeShow } from "./employees/EmployeeShow";
import { EmployeeCreate } from "./employees/EmployeeCreate";

import { InterneList } from "./Internes/InterneList";
import { InterneCreate } from "./Internes/InterneCreate";
import { InterneShow } from "./Internes/interneShow";
import { InternEdit } from "./Internes/InterneEdit";

const dataProvider = jsonServerProvider("http://localhost:3002");

export const App = () => (
  <Admin layout={Layout} dataProvider={dataProvider} dashboard={Dashboard}>
    <Resource
      name="Employees"
      list={EmployeeList}
      create={EmployeeCreate}
      edit={EmployeeEdit}
      show={EmployeeShow}
    />
    <Resource
      name="Internes"
      list={InterneList}
      create={InterneCreate}
      edit={InternEdit}
      show={InterneShow}
    />
  </Admin>
);