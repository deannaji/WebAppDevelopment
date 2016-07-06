/**
 * Posts.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
      id:{ "type":"integer"},
      link_title:{"type":"string"},
      main_link:{"type":"string"},
      username:{"type":"string"},
      likes: {"type":"integer"},
      postDate:{"type":"text"}
  }
};

