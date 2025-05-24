const addImageBtn = document.getElementById('add-image-btn');
const imageUrlInput = document.getElementById('image-url-input');
const gallery = document.getElementById('gallery');
const previewContainer = document.getElementById('preview-container');
const previewImage = document.getElementById('preview-image');
const clearAllBtn = document.getElementById('clear-all-btn');
const imageUploadInput = document.getElementById('image-upload');

const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalClose = document.getElementById('modal-close');

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

let debounceTimer;
imageUrlInput.addEventListener('input', () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    const url = imageUrlInput.value.trim();
    if (isValidUrl(url)) {
      previewImage.src = url;
      previewContainer.classList.remove('hidden');
    } else {
      previewContainer.classList.add('hidden');
      previewImage.src = '';
    }
  }, 300);
});

function createGalleryItem(url) {
  const div = document.createElement('div');
  div.className = 'gallery-item';

  const img = document.createElement('img');
  img.src = url;
  img.alt = 'Gallery image';

  // Open modal on image click
  img.addEventListener('click', () => {
    modalImg.src = url;
    modal.classList.remove('hidden');
  });

  const delBtn = document.createElement('button');
  delBtn.className = 'delete-btn';
  delBtn.innerHTML = '&times;';

  delBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    div.remove();
  });

  div.appendChild(img);
  div.appendChild(delBtn);

  return div;
}

// Predefined images to load initially
const predefinedImages = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80"
];

// Load predefined images on page load
window.addEventListener('load', () => {
  predefinedImages.forEach(url => {
    const item = createGalleryItem(url);
    gallery.appendChild(item);
  });
});

// Add image by URL without validation (accept all)
addImageBtn.addEventListener('click', () => {
  const url = imageUrlInput.value.trim();
  if (!url) {
    alert('Please enter an image URL.');
    return;
  }

  const item = createGalleryItem(url);
  gallery.appendChild(item);

  imageUrlInput.value = '';
  previewContainer.classList.add('hidden');
  previewImage.src = '';
});

// Upload image(s) from device
imageUploadInput.addEventListener('change', (e) => {
  const files = e.target.files;
  if (!files.length) return;

  Array.from(files).forEach(file => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const item = createGalleryItem(event.target.result);
      gallery.appendChild(item);
    };
    reader.readAsDataURL(file);
  });

  imageUploadInput.value = '';
});

// Clear all images from gallery
clearAllBtn.addEventListener('click', () => {
  if (confirm('Are you sure you want to clear all images?')) {
    gallery.innerHTML = '';
  }
});

// Close modal on close button click or outside image click
modalClose.addEventListener('click', () => {
  modal.classList.add('hidden');
  modalImg.src = '';
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.add('hidden');
    modalImg.src = '';
  }
});
