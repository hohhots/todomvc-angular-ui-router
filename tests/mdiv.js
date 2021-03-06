define([
  'intern!object',
  'intern/chai!assert',
  'require',
  'intern/order!libs/jquery',
  'intern/order!libs/jquery-ui',
  'intern/order!libs/element-resize-detector',
  'intern/order!todo/mdiv'
], function (registerSuite, assert, require) {
   var elClassName = 'mdiv',
       containerClassName = 'mdiv-container',
      mongolClassName = 'mongol';

  registerSuite({
    name: 'mongol div definition',

    'test is div': function() {
      assert.isTrue($('<span class="mongol"></span>').
                    mdiv().hasClass('mongol'), 'Only div html element\'s class \'mongol\' has effect!');
    }
  });
  
	registerSuite({
		name: 'mongol div in window',

    setup: function() {
      element = $('<div class="mongol"></div>').mdiv(); 
    },

    'test mdiv class': function(){
      assert.isTrue(element.hasClass(elClassName), 'Make sure after build the DIV which has corresponding class will has correct changed class name.');
    },

    'test div height in window': function() {
      var ih = $(window).innerHeight() - parseInt($('body').css('margin-top')) - parseInt($('body').css('margin-bottom'));
      assert.equal(element.outerWidth(), ih, 'In window mongol div has same height value with window innerHeight.');
    },

    'test _container div height in window': function() {
      assert.equal(element.css('width'), element.parent('div.' + containerClassName).innerWidth()+ 'px');
    }
	});

  registerSuite({
    name: 'mongol div in other div',

    'test wrap div of nested divs with mongol class': function() {
      assert.isTrue($('<div class="mongol"><div class="mongol"></div></div>').
                    first().mdiv().hasClass('mongol'), 'Can\'t nest divs with mongol class.');
    },

    'test wrapped div of nested divs with mongol class': function() {
      assert.isTrue($('<div class="mongol"><div class="mongol"></div></div>').
                    children('.mongol').mdiv().hasClass('mongol'), 'Can\'t nest divs with mongol class.');
    },

    'test mdiv divs wrap mongol mdiv.': function() {
      assert.isTrue($('<div class="' + elClassName + '"><div class="mongol"></div></div>').
                    children('.mongol').mdiv().hasClass('mongol'), 'Can\'t insert mongol div into mdiv div.');
    },

    'test mongol div wrap mdiv div.': function() {
      assert.isTrue($('<div class="mongol"><div class="' + elClassName + '"></div></div>').
                    first().mdiv().hasClass('mongol'), 'mongol div can\'t wrap other div with ' + elClassName + ' class');
    },

    'test wrap mongol div correct.': function() {
      assert.isTrue($('<div><div class="mongol"></div></div>').
                    children('.mongol').mdiv().hasClass(elClassName), 'mongol div can used in other div which is not mongol or ' + elClassName + ' class div');
    },

    'test mongol div width in other div.': function() {
      var el = $('<div style="height: 100px;width: 200px"><div class="mongol"></div></div>');
      var h = el.children('.mongol').mdiv().outerWidth();
      assert.equal(h, el.innerHeight(), 'mongol div must has same width value with outer container div height value.');
    }


  });

  registerSuite({
		name: 'mongol div with class in window',

    setup: function() {
      el = $('<div class="mongol"></div>').mdiv();
      el1 = $('<div class="my mongol my1"></div>').mdiv();
      el2 = $('<div class="my mongol my1 Mongol"></div>').mdiv();
    },

    'test "mongol" class replaced by "mdiv"': function() {
      assert.isFalse(el.hasClass('mongol'));
      assert.isFalse(el1.hasClass('mongol'));
      assert.isFalse(el2.hasClass('mongol'));
    },
    
    'test origin not mongol class exist.': function() {
      assert.isTrue(el.hasClass(elClassName));
      assert.isTrue(el1.hasClass(elClassName + ' my my1'));
      assert.isTrue(el2.hasClass(elClassName + ' my my1'));
    },

    'test set class mdiv to head.': function() {
      assert.equal(el.prop('class'), elClassName);
      assert.equal(el1.prop('class'), elClassName + ' my my1');
      assert.equal(el2.prop('class'), elClassName + ' my my1');
    }
  });
})
