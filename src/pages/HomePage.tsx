import { FC } from 'react';
const HomePage: FC = () => {
    return (
<div id="main-page-text">
This is a tool for managing the hardware and software components of the different
projects in a company. There is a PostgreSQL database where all the components are stored
with all the necessary information about them. The access to the database is 
restricted to the project managers and the system administrators. The main benefit of this restriction
is that the names of the components can not be changed arbitrarily and hence a more structured workflow can be guaranteed.
<br />
<br />

In this tool users can request components in  bulk , i.e. 20 or more requests can be 
made at any given time. The requests are then processed by the system and the components are
created in the Jira. The components are then assigned to the project or component managers 
in the corresponding projects. The main benefit of using Jira
for this task is that it is widely known by many people working in 
this industry and hence the learning curve is very low. Also there are some
nice functionalites in Jira which makes the tracking of the components
very easy.
<br />
<br />

The tool also supports the following features:
<ul>
  <li>Adding new components</li>
  <li>Editing existing components</li>
  <li>Deleting components</li>
  <li>Searching for components</li>
  <li>Filtering components</li>
  <li>Sorting components</li>
  <li>Exporting components</li>
  <li>Importing components</li>
  <li>Requesting components</li>
  <li>Creating Jira tickets</li>
  <li>Assigning components to project managers</li>
  <li>Updating the status of components</li>
  <li>Viewing the history of components</li>
</ul>

</div>
    );
}
export default HomePage;