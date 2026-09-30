const forumLatest =
  'https://cdn.freecodecamp.org/curriculum/forum-latest/latest.json';
const forumTopicUrl = 'https://forum.freecodecamp.org/t/';
const forumCategoryUrl = 'https://forum.freecodecamp.org/c/';
const avatarUrl = 'https://cdn.freecodecamp.org/curriculum/forum-latest';

const allCategories = {
  299: { category: 'Career Advice', className: 'career' },
  409: { category: 'Project Feedback', className: 'feedback' },
  417: { category: 'freeCodeCamp Support', className: 'support' },
  421: { category: 'JavaScript', className: 'javascript' },
  423: { category: 'HTML - CSS', className: 'html-css' },
  424: { category: 'Python', className: 'python' },
  432: { category: 'You Can Do This!', className: 'motivation' },
  560: { category: 'Back-End Development', className: 'backend' }
};
function timeAgo(time){
  time=new Date(time)
  const timeConvert=time.getTime()
  const now = new Date().getTime()
  const elapsedMs = now - timeConvert;
  const elapsedMin = Math.floor(elapsedMs / (1000 * 60));
  const elapsedHours = Math.floor(elapsedMin / 60);
  const elapsedDays = Math.floor(elapsedHours / 24);
  if (elapsedMin<60){
    return `${elapsedMin}m ago`
  }else if ((elapsedHours)<24){
    return `${elapsedHours}h ago`
  } else{
    return `${elapsedDays}d ago`
  }

}
function viewCount (views){
  if (views>=1000){
    return `${Math.floor(views/1000)}k`
  } else {
    return views
  }
}
function forumCategory(id){
  let selectedCategory=allCategories[id]
  if (!selectedCategory) {
    selectedCategory = { category: 'General', className: 'general' };
  }
  const {category,className}=selectedCategory
  return `<a class="category ${className}" href="${forumCategoryUrl}${className}/${id}">${category}</a>`
}
function avatars(posters,users){
  return posters.map(poster=>{
    const user=users.find(user=> user.id===poster.user_id)
    if (user){
      let avatar=user.avatar_template.replace("{size}","30")
      if (avatar.startsWith("/")){
        avatar=`${avatarUrl}${avatar}`
      }
      return `<img src="${avatar}" alt="${user.name}" />`
    }
    return ''
  }).join('')
}
const postsContainer=document.getElementById("posts-container")
function showLatestPosts(obj){
  
  const {users,topic_list}=obj
  const {topics}=topic_list
  topics.forEach(({slug,title,id,posts_count,views,bumped_at,category_id,posters}) => {
    postsContainer.innerHTML+=`<tr>
    <td><a class="post-title" href="${forumTopicUrl}${slug}/${id}">${title}</a>${forumCategory(category_id)}</td>
    <td><div class="avatar-container">${avatars(posters,users)}</div></td>
    <td>${posts_count - 1}</td>
    <td>${views}</td>
    <td>${timeAgo(bumped_at)}</td>
    </tr>`
  })
}
async function fetchData(){
  try{
  const res= await fetch(forumLatest)
  const data= await res.json()
  showLatestPosts(data);
  } catch(error){
    console.log(error);
  }
}
fetchData()