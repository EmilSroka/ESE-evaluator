import { NgModule, Renderer2, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@NgModule({
  providers: [
    {
      provide: Renderer2,
      deps: [DOCUMENT, RendererFactory2],
      useFactory: (document: Document, factory: RendererFactory2) => {
        return factory.createRenderer(document, null);
      },
    },
  ],
})
export class RendererModule {}
