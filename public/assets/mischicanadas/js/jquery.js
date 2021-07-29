class DomElement
{
  constructor(selector)
  {
    this.selector = selector || null;
    this.element = null;
    this.eventHandler = {
      events: [],
      bindEvent: function(event, callback, targetElement) 
      {
        this.unbindEvent(event, targetElement);
        targetElement.addEventListener(event, callback, false);
        this.events.push({
          type: event,
          event: callback,
          target: targetElement
        });
      },
      findEvent: function(event) 
      {
        return this.events.filter(function(evt) 
        {
          return (evt.type === event);
        }, event)[0];
      },
      unbindEvent: function(event, targetElement) 
      {
        var foundEvent = this.findEvent(event);
        if (foundEvent !== undefined) 
        {
          targetElement.removeEventListener(event, foundEvent.event, false);
        }
        this.events = this.events.filter(function(evt) 
        {
          return (evt.type !== event);
        }, event);
      }
     };
  }

  init() 
  {
    switch (this.selector[0]) 
    {
      case `<`:
      var matches = this.selector.match(/<([\w-]*)>/);
      if (matches === null || matches === undefined) 
      {
        throw `Invalid Selector / Node`;
        return false;
      }
      var nodeName = matches[0].replace(`<`, ``).replace(`>`, ``);
      this.element = document.createElement(nodeName);
      break;
      case undefined:
        this.element = this.selector; break;
      default:
        this.element = document.querySelector(this.selector);
    }
  }

  on(event, callback) 
  {
    var evt = this.eventHandler.bindEvent(event, callback, this.element);
  }

 on_document(event, sel, handler) 
 {
    this.element.addEventListener(event, function(event) 
    {
      var t = event.target;
      while (t && t !== this) 
      {
        if (t.matches(sel))
        {
          handler.call(t, event);
        }
        t = t.parentNode;
      }
    });
  }

  off(event) 
  {
    var evt = this.eventHandler.unbindEvent(event, this.element);
  }

  val(newVal) 
  {
    return (newVal !== undefined ? this.element.value = newVal : this.element.value);
  }

  append(html) 
  {
    this.element.innerHTML = this.element.innerHTML + html;
  }

  prepend(html) 
  {
    this.element.innerHTML = html + this.element.innerHTML;
  }

  html(html) 
  {
    if (html === undefined) 
    {
      return this.element.innerHTML;
    }
    this.element.innerHTML = html;
  }

  text(text) 
  {
    if (text === undefined) 
    {
      return this.element.textContent;
    }
    this.element.textContent = text;
  }

  class()
  {
    return this.element.classList;
  }

  hasClass(class_name) 
  {
    return new RegExp('(\\s|^)' + class_name + '(\\s|$)').test(this.element.className);
  }

  addClass(class_name)
  {
    if (class_name === undefined) 
    {
      return console.warn("Missing class name - addClass(class_name)");
    }
    this.element.classList.add(class_name);
  }

  removeClass(class_name)
  {
    if (class_name === undefined) 
    {
      return console.warn("Missing class name - removeClass(class_name)");
    }
    this.element.classList.remove(class_name);
  }

  toggleClass(class_name)
  {
    if (class_name === undefined) 
    {
      return console.warn("Missing class name - toggleClass(class_name)");
    }

    if (this.element.classList) 
    { 
      this.element.classList.toggle(class_name);
    } 
    else 
    {
      // For IE9
      var classes = this.element.className.split(" ");
      var i = classes.indexOf("mystyle");

      if (i >= 0) 
        classes.splice(i, 1);
      else 
        classes.push("mystyle");
        this.element.className = classes.join(" "); 
    }
  }

  tagName()
  {
    return this.element.tagName;
  }

  attr(attr,value=undefined)
  {
    if (attr === undefined)
    {
      return console.warn("Missing attribute name - attr(attr_name,?value)");
    }
    if (value === undefined)
    {
      return this.element.getAttribute(attr);
    }
    return this.element.setAttribute(attr,value);
  }

}

$ = function(selector) 
{
  var el = new DomElement(selector);
  el.init();
  return el;
}