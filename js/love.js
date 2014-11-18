var love = function(element, options) {
    this.current = 0;
    this.delay = options.delay || 4000; // Word delay (ms)
    this.element = (typeof element == 'string' ? document.getElementById(element) : element);
    this.list = options.list || [ { title: 'U' } ];
    this.prepend = options.prepend || 'We <span>&hearts;</span> ';
    this.speed = 80; // Letter type speed (ms)
    this.timer = null;
    
    this.write();
};

love.prototype = {
    write: function(loop) {
        function writeFull() {
            self.element.innerHTML = self.prepend + (current.href ? '<a href="' + current.href + '">' + current.title + '</a>' : current.title);
        }
        
        if(this.element) {
            var self = this,
                current = self.list[self.current],
                rewrite = { string: '', letter: 0 };
                
            if(loop) {
                self.stop();
                
                var rewriteTimer = setInterval(function() {
                    if(current.title[rewrite.letter] == '<') {
                        do {
                            rewrite.string += current.title[rewrite.letter];
                        } while(current.title[++rewrite.letter] != '>');
                    }
                    
                    rewrite.string += current.title[rewrite.letter++];
                    self.element.innerHTML = self.prepend + rewrite.string;
                    
                    if(rewrite.string == current.title) {
                        writeFull();
                        clearInterval(rewriteTimer);
                        self.start();
                    }
                }, self.speed);
            } else {
                writeFull();
            }
        }
    },
    
    start: function() {
        var self = this;
        
        if(self.list.length > 1) {
            self.timer = setInterval(function() {
                self.current.length = self.list[self.current].title.length;
                
                if(++self.current >= self.list.length) {
                    self.current = 0;
                }
                
                self.write(true);
            }, self.delay);
        }
    },
    
    stop: function() {
        if(this.timer) {
            clearInterval(this.timer);
        }
    }
};
