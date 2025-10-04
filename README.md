# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/main/packages/create-svelte).

## Setting up the project

When you want to work on this project you have to make sure to install all the packages from the [package.json](/package.json) file. You can do this by tunning one the two following commands in your terminal:

```bash
npm install 
 
## or the following command

npm i
```

## Developing

Once you are done with setting up the project you can start developing. Take into the mind the following:

- [Branches](#branches)
- [Commits](#commits)
- [Development server](#development-server)
- [Linting](#linting)

### Branches

On the [GitHub](https://github.com/SNiC-foundation/availabilit/issues) you add issues for a new feautre. After you made an issue you can use the _create branch_ button to create a branch for this issue. Make sure to not delete the issue number in the branch name. You can shorten the name of the branch, but make sure the keep the meaning of the issue clear and consise in the name. This way, everyone that is working on this project easily knows what are bracnh are for which issue.

### Commits

When making commits, make sure to write meaningfull commit messages, also include the issue number you are working  on in your commit message by using _"`#<issue number>`_" at the start of your commit message. This will link the commit to the issue in the GitHub repo automatically.

 You can use the [Conventional Commits (for VSCode)](https://marketplace.visualstudio.com/items?itemName=vivaxy.vscode-conventional-commits) extension. [Here]() you can find more  info about how to write commits using this extension.

### Development server

To run development server when you are working on the project, use the following command in yout terminal:

```bash
npm run dev
```

If no issues occur, you can expect something like the following in your terminal:

```bash

> snic@0.0.1 dev
> vite dev

Forced re-optimazation of dependecies

VITE v.5.4.19 ready in 3712 ms

-> Local:   http://localhost:5173/
-> Network:  use --host to expose
-> press h + enter to show help

```

You can click on the localhost link to see the current version of the project. The devlopment server will autamticaaly check for changes in the code and reflect them to the localhost webpage. 

### Linting

This project is using configured with ESLint.

When you are done with the feature you are deveoloping you have to make sure to use ESLint BEFORE creating a pull request to merge to the main branch. To do this, please use the following command(s) in your terminal.

```bash
# When you have dev server running first do the following
"Ctrl + C"

# Run the linting
npm run lint
```

Running this will give a list of errors and warnings about your new written code which you can/could resolve. More on ESLint can be found [here](https://eslint.org)

## Deployment

When you want to deploy a new version of the website make sure to merge the new feature to the main branch and resolve any merge conflicts. Once you have done that, you can go ahead and run the following command in your terminal:

```bash
npm run deploy
```

This command will build the app and deploy it to the gh-pages branch. After this you can got to [`GitHub Actions`](https://github.com/SNiC-foundation/availabilit/actions) of the repo and see the deployment. After the deployment is complete you will have a new version of the website, findable at [`availabilit.snic.nl`](https://availabilit.snic.nl)

## Questions

For any questions about the website, about the repo or general question about the congress, you can contact us by mailing us using [`info@availabilit.snic.nl`](info@availabilit.snic.nl).
