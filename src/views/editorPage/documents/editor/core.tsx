import React from "react";
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
    Component: (props: { [x: string]: any }) =>
      (
        <EditorBlockWrapper>
          <Avatar {...props} />
        </EditorBlockWrapper>
      ) as any,
  },
  Button: {
    schema: ButtonPropsSchema,
    Component: (props: { [x: string]: any }) =>
      (
        <EditorBlockWrapper>
          <Button {...props} />
        </EditorBlockWrapper>
      ) as any,
  },
  Container: {
    schema: ContainerPropsSchema as any,
    Component: (props: { [x: string]: any }) =>
      (
        <EditorBlockWrapper>
          <ContainerEditor {...props} />
        </EditorBlockWrapper>
      ) as any,
  },
  ColumnsContainer: {
    schema: ColumnsContainerPropsSchema as any,
    Component: (props: { [x: string]: any }) =>
      (
        <EditorBlockWrapper>
          <ColumnsContainerEditor {...props} />
        </EditorBlockWrapper>
      ) as any,
  },
  Heading: {
    schema: HeadingPropsSchema,
    Component: (props: { [x: string]: any }) =>
      (
        <EditorBlockWrapper>
          <Heading {...props} />
        </EditorBlockWrapper>
      ) as any,
  },
  Html: {
    schema: HtmlPropsSchema,
    Component: (props: { [x: string]: any }) =>
      (
        <EditorBlockWrapper>
          <Html {...props} />
        </EditorBlockWrapper>
      ) as any,
  },
  Image: {
    schema: ImagePropsSchema,
    Component: (data: { [x: string]: any }) => {
      const props = {
        ...data,
        props: {
          ...data.props,
          url:
            data.props?.url ??
            "https://placehold.co/600x400@2x/F8F8F8/CCC?text=Your%20image",
        },
      };
      return (
        <EditorBlockWrapper>
          <Image {...props} />
        </EditorBlockWrapper>
      ) as any;
    },
  },
  Text: {
    schema: TextPropsSchema,
    Component: (props: { [x: string]: any }) =>
      (
        <EditorBlockWrapper>
          <Text {...props} />
        </EditorBlockWrapper>
      ) as any,
  },
  EmailLayout: {
    schema: EmailLayoutPropsSchema as any,
    Component: (p: { [x: string]: any }) =>
      (<EmailLayoutEditor {...p} />) as any,
  },
  Spacer: {
    schema: SpacerPropsSchema,
    Component: (props: { [x: string]: any }) =>
      (
        <EditorBlockWrapper>
          <Spacer {...props} />
        </EditorBlockWrapper>
      ) as any,
  },
  Divider: {
    schema: DividerPropsSchema,
    Component: (props: { [x: string]: any }) =>
      (
        <EditorBlockWrapper>
          <Divider {...props} />
        </EditorBlockWrapper>
      ) as any,
  },
}) as any;

export const EditorBlockSchema =
  buildBlockConfigurationSchema(EDITOR_DICTIONARY);
export const EditorConfigurationSchema = z.record(EditorBlockSchema);

export type TEditorBlock = z.infer<typeof EditorBlockSchema>;
export type TEditorConfiguration = Record<string, TEditorBlock>;
