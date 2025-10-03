import getConfiguration from "../../getConfiguration";
import type { TEditorConfiguration } from "./core";
import { defineStore } from "pinia";
import { ref } from "vue";

type TValue = {
  document: TEditorConfiguration;

  selectedBlockId: string | null;
  selectedSidebarTab: 'block-configuration' | 'styles';
  selectedMainTab: 'editor' | 'preview' | 'json' | 'html';
  selectedScreenSize: 'desktop' | 'mobile';

  inspectorDrawerOpen: boolean;

  INSPECTOR_DRAWER_WIDTH: number;
};


export const useInspectorDrawer = defineStore('inspectorDrawer', () => {
  const document = ref<TValue['document']>(getConfiguration(typeof window !== 'undefined' ? window.location.hash : ''))
  const selectedBlockId = ref<TValue['selectedBlockId']>(null)
  const selectedSidebarTab = ref<TValue['selectedSidebarTab']>('styles')
  const selectedMainTab = ref<TValue['selectedMainTab']>('editor')
  const selectedScreenSize = ref<TValue['selectedScreenSize']>('desktop')
  const inspectorDrawerOpen = ref<TValue['inspectorDrawerOpen']>(false)
  const INSPECTOR_DRAWER_WIDTH = 335

  function setSelectedBlockId(blockId: TValue['selectedBlockId']) {
    const tab = blockId === null ? 'styles' : 'block-configuration'

    if (blockId !== null) {
      inspectorDrawerOpen.value = true
    }

    selectedBlockId.value = blockId
    selectedSidebarTab.value = tab
  }

  function setDocument(newDocument: TValue['document']) {
    const originalDocument = document.value

    document.value = {
      ...originalDocument,
      ...newDocument,
    }
  }

  function resetDocument(newDocument: TValue['document']) {
    document.value = newDocument
    selectedSidebarTab.value = 'styles'
    selectedBlockId.value = null
  }

  return {
    document,
    selectedBlockId,
    selectedSidebarTab,
    selectedMainTab,
    selectedScreenSize,
    inspectorDrawerOpen,
    INSPECTOR_DRAWER_WIDTH,

    setSelectedBlockId,
    setDocument,
    resetDocument,
  }
})
