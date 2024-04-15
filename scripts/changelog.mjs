import * as fs from 'fs';
import dedent from "dedent";
import { input } from '@inquirer/prompts';

const generateContent = async (answers) => {
  const d = new Date();
  const date = [d.getFullYear(), ('0' + (d.getMonth() + 1)).slice(-2), ('0' + d.getDate()).slice(-2)].join('-');

  return dedent`
    ---
    title: Release ${answers.version}
    description: ${answers.description}
    image: /images/guides/${answers.image}
    date: ${date}
    authors:
      - zac
    ---

    ## Changelog for ${answers.version}

    ### New Features
    -

    ### Bug Fixes
    -

    ### Dependency Updates
    -
  `;
};

const run = async () => {
  const version = await input({
    message: 'Enter Release Version:',
    validate: function(value) {
      if (!value) {
        return 'Release Version is required.';
      }
      return true;
    }
  });
  console.log(version);

  const description = await input({
    message: 'Enter description',
    validate: function(value) {
      if (!value) {
        return 'Description is required.'
      }
      return true;
    }
  });
  console.log(description);

  const image = await input({
    message: 'Add image name including extension:',
    validate: function(value) {
      if (!value) {
        return 'Image is required.';
      }

      if (!fs.existsSync(`public/images/guides/${value}`)) {
        return 'Image was not found in /images/guides/. Please try again.';
      }
    
      return true;
    }
  });
  console.log(image);

  const answers = {
    version,
    description,
    image
  }

  const fileContent = await generateContent(answers);
  const filePath = `content/changelog/release-${answers.version}.mdx`;
  fs.writeFile(filePath, fileContent, (err) => {
    if (err) {
      throw err;
    } else {
      console.log(`Changelog generated at ${filePath}`);
    }
  })
}

run();
