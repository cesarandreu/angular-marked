'use strict';

// TODO: test options
// TODO: test ng-include
// TODO: test marked.setOptions

describe('Directive: marked,', function () {

  // load the directive's module
  beforeEach(module('hc.marked'));

  var element,
    scope,
    $httpBackend,
    $compile,
    markdown, html;

  beforeEach(inject(function ($rootScope, $templateCache, _$httpBackend_, _$compile_) {

    scope = $rootScope.$new();

    scope.markdown = markdown = "# A heading\n\nHello *world*. Here is a [link](//hello).\nAnd an image ![alt](src).\n\n    Code goes here.\n";

    html = "<h1 id=\"a-heading\">A heading</h1>\n<p>Hello <em>world</em>. Here is a <a href=\"//hello\">link</a>.\nAnd an image <img src=\"src\" alt=\"alt\">.</p>\n<pre><code>Code goes here.</code></pre>";

    scope.file = 'file.md';

    $httpBackend = _$httpBackend_;
    $compile = _$compile_;

    $httpBackend.expect('GET', scope.file).respond(markdown);

  }));

  describe('Include', function () {
    it('should convert file', function () {

      element = $compile('<div><div marked ng-include="file">JUNK</div></div>')(scope);
      scope.$digest();
      $httpBackend.flush();
      expect(element.html()).toContain(html);
      expect(element.html()).toNotContain('JUNK');

    });

    it('should convert file', function () {
      element = $compile('<div><div marked ng-include="\'file.md\'">JUNK</div></div>')(scope);
      scope.$digest();
      $httpBackend.flush();
      expect(element.html()).toContain(html);
      expect(element.html()).toNotContain('JUNK');
    });
  });

  describe('Element,', function () {
    it('should convert markdown', function () {
      element = $compile('<marked>## Element</marked>')(scope);
      expect(element.html()).toContain('<h2 id="element">Element</h2>');
    });
  });

  describe('Attribute,', function () {
    it('should convert markdown', function () {
      element = $compile('<div marked>## Attribute</div>')(scope);
      expect(element.html()).toContain('<h2 id="attribute">Attribute</h2>');
    });

    it('should convert markdown from scope', function () {
      element = $compile('<div marked="markdown"></div>')(scope);
      expect(element.html()).toContain(html);
    });

    it('should convert markdown from string', function () {
      element = $compile('<div marked="\'## String\'"></div>')(scope);
      expect(element.html()).toContain('<h2 id="string">String</h2>');
    });
  });

});
