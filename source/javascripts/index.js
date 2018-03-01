(function($) {
  // Pseudo class inheritance.
  function inherit(ctor, superCtor) {
    ctor.prototype = Object.create(superCtor.prototype);
    ctor.prototype.constructor = ctor;
  }

  // Return super simple template function.
  function template(tmpl) {
    return function(data) {
      return tmpl.replace(/{{([^}]+)}}/g, function(whole, name) {
        var item = data[name.trim()];
        return item == null ? '' : item;
      });
    };
  }

  // Fetch JSON data and show it.
  function Loader(url, selector) {
    this.url = url;
    this.selector = selector;
  }
  Loader.prototype.showData = function(response) {
    var data = this.processData(response);
    var $ul = $('<ul />');
    $ul.html(data.map(template(this.tmpl)).join(''));
    $ul.appendTo(this.selector);
  };
  Loader.prototype.showError = function(xhr) {
    console.log('Error', xhr.status, xhr.statusText);
  };
  Loader.prototype.start = function() {
    // Get JSON with JSONP.
    $.getJSON(this.url + '?callback=?')
      .done(this.showData.bind(this))
      .fail(this.showError.bind(this));
  };
  Loader.prototype.processData = function(response) {
    return response.data;
  };

  // Loader for Github repos.
  function RepoLoader() {
    var url = 'https://api.github.com/orgs/m3dev/repos';
    var selector = '.github-repos';
    var limit = 10;
    Loader.call(this, url, selector, limit);
  }
  inherit(RepoLoader, Loader);
  RepoLoader.prototype.tmpl = [
    '<li class="github-repo">',
    '<a href="{{html_url}}" title="{{name}}" target="_blank">{{name}} ',
    '<span class="github-repo-lang">{{language}}</span>',
    '</a>',
    '<div class="github-repo-meta">',
    '<span class="github-repo-stars">{{stargazers_count}} stars</span>',
    '</div>',
    '</li>'
  ].join('');
  RepoLoader.prototype.processData = function(response) {
    return response.data.sort(function (a, b) { 
      return b.stargazers_count - a.stargazers_count; 
    }).slice(0, 10);
  };

  // Loader for Github members.
  function MemberLoader() {
    var url = 'https://api.github.com/orgs/m3dev/members';
    var selector = '.github-members';
    Loader.call(this, url, selector);
  }
  inherit(MemberLoader, Loader);
  MemberLoader.prototype.tmpl = [
    '<li class="github-member">',
    '<a href="{{html_url}}" title="{{login}}" target="_blank">',
    '<img src="{{avatar_url}}" alt="{{login}}" width="40" height="40">',
    '</a>',
    '</li>'
  ].join('');

  new RepoLoader().start();
  new MemberLoader().start();
})(jQuery);
