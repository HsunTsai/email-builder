import { z } from "zod";

import Heading, { HeadingPropsSchema } from "@flyhub/email-block-heading";
import Text, { TextPropsSchema } from "@flyhub/email-block-text";
import Button, { ButtonPropsSchema } from "@flyhub/email-block-button";
import Image, { ImagePropsSchema } from "@flyhub/email-block-image";
import Avatar, { AvatarPropsSchema } from "@flyhub/email-block-avatar";
import Divider, { DividerPropsSchema } from "@flyhub/email-block-divider";
import Spacer, { SpacerPropsSchema } from "@flyhub/email-block-spacer";
import Html, { HtmlPropsSchema } from "@flyhub/email-block-html";

import {
  buildBlockConfigurationDictionary,
  buildBlockConfigurationSchema,
} from "@flyhub/email-document-core/builders";

import ColumnsContainerEditor from "../blocks/ColumnsContainer/ColumnsContainerEditor.vue";
import ColumnsContainerPropsSchema from "../blocks/ColumnsContainer/ColumnsContainerPropsSchema";
import ContainerEditor from "../blocks/Container/ContainerEditor.vue";
import ContainerPropsSchema from "../blocks/Container/ContainerPropsSchema";
import EmailLayoutEditor from "../blocks/EmailLayout/EmailLayoutEditor.vue";
import EmailLayoutPropsSchema from "../blocks/EmailLayout/EmailLayoutPropsSchema";
import EditorBlockWrapper from "../blocks/helpers/block-wrappers/EditorBlockWrapper.vue";

export const EDITOR_DICTIONARY = buildBlockConfigurationDictionary({
  Avatar: {
    schema: AvatarPropsSchema,
    Component: (props) =>
      h(
        EditorBlockWrapper,
        {},
        {
          default: () => h(Avatar, props),
        }
      ),
  },
  Button: {
    schema: ButtonPropsSchema,
    Component: (props) =>
      h(
        EditorBlockWrapper,
        {},
        {
          default: () => h(Button, props),
        }
      ),
  },
  Container: {
    schema: ContainerPropsSchema,
    Component: (props) =>
      h(
        EditorBlockWrapper,
        {},
        {
          default: () => h(ContainerEditor, props),
        }
      ),
  },
  ColumnsContainer: {
    schema: ColumnsContainerPropsSchema,
    Component: (props: any) =>
      h(
        EditorBlockWrapper,
        {},
        {
          default: () => h(ColumnsContainerEditor, props),
        }
      ),
  },
  Heading: {
    schema: HeadingPropsSchema,
    Component: (props) =>
      h(
        EditorBlockWrapper,
        {},
        {
          default: () => h(Heading, props),
        }
      ),
  },
  Html: {
    schema: HtmlPropsSchema,
    Component: (props) =>
      h(
        EditorBlockWrapper,
        {},
        {
          default: () => h(Html, props),
        }
      ),
  },
  Image: {
    schema: ImagePropsSchema,
    Component: (data) => {
      const props = {
        ...data,
        props: {
          ...data.props,
          url:
            data.props?.url ??
            "https://placehold.co/600x400@2x/F8F8F8/CCC?text=Your%20image",
        },
      };
      return h(
        EditorBlockWrapper,
        {},
        {
          default: () => h(Image, props),
        }
      );
    },
  },
  Text: {
    schema: TextPropsSchema,
    Component: (props) =>
      h(
        EditorBlockWrapper,
        {},
        {
          default: () => h(Text, props),
        }
      ),
  },
  EmailLayout: {
    schema: EmailLayoutPropsSchema,
    Component: (p: any) => h(EmailLayoutEditor, p),
  },
  Spacer: {
    schema: SpacerPropsSchema,
    Component: (props) =>
      h(
        EditorBlockWrapper,
        {},
        {
          default: () => h(Spacer, props),
        }
      ),
  },
  Divider: {
    schema: DividerPropsSchema,
    Component: (props) =>
      h(
        EditorBlockWrapper,
        {},
        {
          default: () => h(Divider, props),
        }
      ),
  },
});

export const EditorBlockSchema =
  buildBlockConfigurationSchema(EDITOR_DICTIONARY);
export const EditorConfigurationSchema = z.record(
  z.string(),
  EditorBlockSchema
);

export type TEditorBlock = z.infer<typeof EditorBlockSchema>;
export type TEditorConfiguration = Record<string, TEditorBlock>;
