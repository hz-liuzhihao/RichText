import { RichText } from '../../src/index';
(function () {
  const root = <HTMLDivElement>document.getElementById('root');
  const richText = new RichText({
    metaInfo: {
      styles: [],
      textRows: [{
        items: [{
          type: 'text',
          content: '测试第一行文本',
        }]
      }, {
        items: [{
          type: 'text',
          content: '测试第二行文本'
        }]
      }],
    },
    dom: root
  });
  richText.load();
})();
