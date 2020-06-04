export class CacheStore {
    
    constructor(name) {
      this.name = name;  
      if(sessionStorage[this.name]){
        this.cache = new Map(JSON.parse(sessionStorage[this.name]));
      }
      else{
        this.cache = new Map();
      }      
    }

    hasCached(key){
        
        if(!sessionStorage[this.name]){
            return false;
        }

        if(this.cache.has(key)){
            return true;
        }
        else{
            return false;
        }        
    }

    setCache(key, value) {
        this.cache.set(key, value);
        this.persist();
    }

    getCache(key) {
        return this.cache.get(key);
    }

    removeCache(key) {
        this.cache.remove(key);
        this.persist();
    }

    clearCache(key) {
        this.cache = new Map();
        this.persist();
    }

    persist(){
        sessionStorage[this.name] = JSON.stringify(Array.from(this.cache.entries()));
    }
}