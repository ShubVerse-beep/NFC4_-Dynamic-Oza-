
# # FACT_CHECK_API_KEY = 'https://factchecktools.googleapis.com/$discovery/rest?version=v1alpha1'  # Get from Google Cloud Console

import streamlit as st
from transformers import pipeline
from PIL import Image
import requests
import google.generativeai as genai
import os
import tempfile
from moviepy.editor import VideoFileClip
import numpy as np
import urllib.request

# Replace with your actual API keys
FACT_CHECK_API_KEY = 'https://factchecktools.googleapis.com/$discovery/rest?version=v1alpha1'  # Get a valid key from Google Cloud Console
GEMINI_API_KEY = 'AIzaSyBLuuEnnE_cKzDgF2WyCUp1N6-H_-M-RCY'  # Your provided key (keep secure)

# Configure Gemini
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')

# Load the pretrained deepfake detection model from Hugging Face
detector = pipeline("image-classification", model="prithivMLmods/deepfake-detector-model-v1")

# Fact-checking functions
def search_fact_check_claim(query, max_results=5):
    """Search Google Fact Check Tools API for text claims."""
    if FACT_CHECK_API_KEY == 'YOUR_ACTUAL_FACT_CHECK_API_KEY':
        return []  # Skip if no valid API key
    url = f"https://factchecktools.googleapis.com/v1alpha1/claims:search?query={query}&key={FACT_CHECK_API_KEY}&pageSize={max_results}"
    try:
        response = requests.get(url)
        if response.status_code == 200:
            return response.json().get('claims', [])
    except Exception as e:
        st.error(f"Fact check API error: {str(e)}")
    return []

def verify_with_gemini(text, fact_check_results):
    """Use Gemini to analyze fact check results and determine verdict."""
    prompt = f"Analyze this claim: '{text}'. Fact check data: {fact_check_results}. Determine if it's fake, true, or not sure. Provide a brief explanation."
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"Error with Gemini API: {str(e)}"

# Deepfake detection functions with custom score-based verdict
def get_verdict(fake_score):
    """Determine verdict based on fake score (0-1)."""
    if 0 <= fake_score <= 0.3:
        return "Real"
    elif 0.7 <= fake_score <= 1:
        return "Fake"
    else:
        return "Not sure"

def detect_image(image_path):
    """Detect if an image is real or fake with score-based verdict."""
    try:
        img = Image.open(image_path)
        result = detector(img)
        fake_score = next((r['score'] for r in result if r['label'] == 'fake'), 0.0)
        verdict = get_verdict(fake_score)
        return f"{verdict} (fake score: {fake_score:.2f})"
    except Exception as e:
        return f"Error processing image: {str(e)}"

def detect_video(video_path, frame_interval=30, check_reverse=False):
    """Detect if a video is real or fake by checking frames, with optional reverse analysis and score-based verdict."""
    try:
        clip = VideoFileClip(video_path)
        total_frames = int(clip.fps * clip.duration)
        fake_scores = []
        frames_to_check = range(0, total_frames, frame_interval)

        # Forward pass
        for i in frames_to_check:
            frame = clip.get_frame(i / clip.fps)
            img = Image.fromarray(frame)
            result = detector(img)
            fake_score = next((r['score'] for r in result if r['label'] == 'fake'), 0.0)
            fake_scores.append(fake_score)

        # Reverse pass if enabled
        if check_reverse:
            for i in reversed(frames_to_check):
                frame = clip.get_frame(i / clip.fps)
                img = Image.fromarray(frame)
                result = detector(img)
                fake_score = next((r['score'] for r in result if r['label'] == 'fake'), 0.0)
                fake_scores.append(fake_score)

        num_checked = len(fake_scores)
        if num_checked == 0:
            return "Error: No frames checked"

        avg_fake_score = np.mean(fake_scores)
        verdict = get_verdict(avg_fake_score)
        clip.close()
        return f"{verdict} (average fake score: {avg_fake_score:.2f}, checked {num_checked} frames)"
    except Exception as e:
        return f"Error processing video: {str(e)}"

def download_from_url(url, file_extension):
    """Download file from URL and save temporarily."""
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=file_extension) as tmp_file:
            urllib.request.urlretrieve(url, tmp_file.name)
            return tmp_file.name
    except Exception as e:
        st.error(f"Error downloading from URL: {str(e)}")
        return None

# Streamlit UI - Three Tab Structure
st.title("Comprehensive Fake News Detection Tool")
st.write("Detect fake news, fake images, and fake videos using AI-powered analysis.")

# Create three tabs as requested
tab1, tab2, tab3 = st.tabs(["📰 Fake News Check", "🖼️ Fake Image Check", "🎥 Fake Video Check"])

# Tab 1: Fake News Detection
with tab1:
    st.header("Fake News Detection")
    st.write("Enter text content to verify its authenticity.")
    
    user_text = st.text_area("Enter the news text to verify:", height=200)
    
    if st.button("Verify News", type="primary"):
        if user_text:
            with st.spinner("Analyzing news content..."):
                fact_checks = search_fact_check_claim(user_text)
                verdict = verify_with_gemini(user_text, fact_checks)
                
                st.subheader("🔍 Analysis Result")
                st.write(verdict)
                
                if fact_checks:
                    st.subheader("📋 Fact Check Details")
                    for claim in fact_checks:
                        st.write(f"**Claim:** {claim.get('text', 'N/A')}")
                        review = claim.get('claimReview', [{}])[0]
                        st.write(f"**Rating:** {review.get('textualRating', 'N/A')}")
                        st.write(f"**Source:** {review.get('publisher', {}).get('name', 'N/A')}")
                        st.write("---")
                else:
                    st.info("No direct fact checks found. Analysis based on AI evaluation.")
        else:
            st.warning("Please enter some text to analyze.")

# Tab 2: Fake Image Detection
with tab2:
    st.header("Fake Image Detection")
    st.write("Upload an image or provide a URL to check if it's real or AI-generated/manipulated.")
    
    # Image input options
    image_input_method = st.radio("Choose input method:", ("Upload Image", "Image URL"), key="image_method")
    
    image_path = None
    
    if image_input_method == "Upload Image":
        uploaded_image = st.file_uploader("Choose an image file:", type=["jpg", "jpeg", "png"], key="image_upload")
        if uploaded_image:
            with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(uploaded_image.name)[1]) as tmp_file:
                tmp_file.write(uploaded_image.getvalue())
                image_path = tmp_file.name
    
    elif image_input_method == "Image URL":
        image_url = st.text_input("Enter image URL:", key="image_url")
        if image_url:
            if st.button("Load Image from URL"):
                image_path = download_from_url(image_url, ".jpg")
    
    if image_path:
        try:
            st.image(image_path, caption="Image to Analyze", use_column_width=True)
            
            if st.button("Analyze Image", type="primary", key="analyze_image"):
                with st.spinner("Analyzing image for authenticity..."):
                    result = detect_image(image_path)
                    
                    st.subheader("🔍 Image Analysis Result")
                    if "Real" in result:
                        st.success(f"✅ {result}")
                    elif "Fake" in result:
                        st.error(f"❌ {result}")
                    else:
                        st.warning(f"⚠️ {result}")
        finally:
            # Clean up
            try:
                os.unlink(image_path)
            except:
                pass

# Tab 3: Fake Video Detection
with tab3:
    st.header("Fake Video Detection")
    st.write("Upload a video or provide a URL to check if it contains deepfakes or manipulated content.")
    
    # Video input options
    video_input_method = st.radio("Choose input method:", ("Upload Video", "Video URL"), key="video_method")
    
    # Advanced options
    st.subheader("Detection Settings")
    frame_interval = st.slider("Frame check interval (1 = every frame, higher = faster but less accurate)", 
                              min_value=1, max_value=60, value=30, key="video_interval")
    check_reverse = st.checkbox("Enable reverse frame checking for better detection (slower)", key="video_reverse")
    
    video_path = None
    
    if video_input_method == "Upload Video":
        uploaded_video = st.file_uploader("Choose a video file:", type=["mp4", "avi", "mov", "mkv"], key="video_upload")
        if uploaded_video:
            with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(uploaded_video.name)[1]) as tmp_file:
                tmp_file.write(uploaded_video.getvalue())
                video_path = tmp_file.name
    
    elif video_input_method == "Video URL":
        video_url = st.text_input("Enter video URL:", key="video_url")
        if video_url:
            if st.button("Load Video from URL"):
                video_path = download_from_url(video_url, ".mp4")
    
    if video_path:
        try:
            st.video(video_path)
            
            if st.button("Analyze Video", type="primary", key="analyze_video"):
                with st.spinner("Analyzing video for deepfakes... (this may take several minutes)"):
                    result = detect_video(video_path, frame_interval=frame_interval, check_reverse=check_reverse)
                    
                    st.subheader("🔍 Video Analysis Result")
                    if "Real" in result:
                        st.success(f"✅ {result}")
                    elif "Fake" in result:
                        st.error(f"❌ {result}")
                    else:
                        st.warning(f"⚠️ {result}")
                        
                    st.info("💡 **Tip:** For better accuracy on suspicious videos, try setting frame interval to 1 and enabling reverse checking.")
        finally:
            # Clean up
            try:
                os.unlink(video_path)
            except:
                pass

# import streamlit as st
# from transformers import pipeline
# from PIL import Image
# import requests
# import google.generativeai as genai
# import os
# import tempfile
# from moviepy.editor import VideoFileClip
# import numpy as np  # For array handling in reverse check

# # Replace with your actual API keys
# FACT_CHECK_API_KEY = 'https://factchecktools.googleapis.com/$discovery/rest?version=v1alpha1'  # Get a valid key from Google Cloud Console (NOT the discovery URL!)
# GEMINI_API_KEY = 'AIzaSyBLuuEnnE_cKzDgF2WyCUp1N6-H_-M-RCY'  # Your provided key (keep secure)

# # Configure Gemini
# genai.configure(api_key=GEMINI_API_KEY)
# model = genai.GenerativeModel('gemini-1.5-flash')

# # Load the pretrained deepfake detection model from Hugging Face
# detector = pipeline("image-classification", model="prithivMLmods/deepfake-detector-model-v1")

# # Fact-checking functions (unchanged)
# def search_fact_check_claim(query, max_results=5):
#     """Search Google Fact Check Tools API for text claims."""
#     url = f"https://factchecktools.googleapis.com/v1alpha1/claims:search?query={query}&key={FACT_CHECK_API_KEY}&pageSize={max_results}"
#     response = requests.get(url)
#     if response.status_code == 200:
#         return response.json().get('claims', [])
#     return []

# def search_fact_check_image(image_url):
#     """Search Google Fact Check Tools API for images."""
#     url = f"https://factchecktools.googleapis.com/v1alpha1/claims:imageSearch?imageUrl={image_url}&key={FACT_CHECK_API_KEY}"
#     response = requests.get(url)
#     if response.status_code == 200:
#         return response.json().get('claims', [])
#     return []

# def verify_with_gemini(text, fact_check_results):
#     """Use Gemini to analyze fact check results and determine verdict."""
#     prompt = f"Analyze this claim: '{text}'. Fact check data: {fact_check_results}. Determine if it's fake, true, or not sure. Provide a brief explanation."
#     try:
#         response = model.generate_content(prompt)
#         return response.text
#     except Exception as e:
#         return f"Error with Gemini API: {str(e)}"

# # Deepfake detection functions with custom score-based verdict
# def get_verdict(fake_score):
#     """Determine verdict based on fake score (0-1)."""
#     if 0 <= fake_score <= 0.3:
#         return "Real"
#     elif 0.7 <= fake_score <= 1:
#         return "Fake"
#     else:
#         return "Not sure"

# def detect_image(image_path):
#     """Detect if an image is real or fake with score-based verdict."""
#     try:
#         img = Image.open(image_path)
#         result = detector(img)
#         # Assume model returns list with 'fake' and 'real'; find fake score
#         fake_score = next((r['score'] for r in result if r['label'] == 'fake'), 0.0)
#         verdict = get_verdict(fake_score)
#         return f"{verdict} (fake score: {fake_score:.2f})"
#     except Exception as e:
#         return f"Error processing image: {str(e)}"

# def detect_video(video_path, frame_interval=30, check_reverse=False):
#     """Detect if a video is real or fake by checking frames, with optional reverse analysis and score-based verdict."""
#     try:
#         clip = VideoFileClip(video_path)
#         total_frames = int(clip.fps * clip.duration)
#         fake_scores = []  # Collect fake scores from all checked frames
#         frames_to_check = range(0, total_frames, frame_interval)

#         # Forward pass
#         for i in frames_to_check:
#             frame = clip.get_frame(i / clip.fps)
#             img = Image.fromarray(frame)
#             result = detector(img)
#             fake_score = next((r['score'] for r in result if r['label'] == 'fake'), 0.0)
#             fake_scores.append(fake_score)

#         # Reverse pass if enabled
#         if check_reverse:
#             for i in reversed(frames_to_check):
#                 frame = clip.get_frame(i / clip.fps)
#                 img = Image.fromarray(frame)
#                 result = detector(img)
#                 fake_score = next((r['score'] for r in result if r['label'] == 'fake'), 0.0)
#                 fake_scores.append(fake_score)

#         num_checked = len(fake_scores)
#         if num_checked == 0:
#             return "Error: No frames checked"

#         avg_fake_score = np.mean(fake_scores)  # Average fake score across checked frames
#         verdict = get_verdict(avg_fake_score)
#         clip.close()  # Explicitly close to release file
#         return f"{verdict} (average fake score: {avg_fake_score:.2f}, checked {num_checked} frames)"
#     except Exception as e:
#         return f"Error processing video: {str(e)}"

# # Streamlit UI - Unified App
# st.title("Fake News Detection Tool")
# st.write("Verify text claims, image contexts, or detect deepfakes in images and videos.")

# # Tabs for different functionalities
# tab1, tab2 = st.tabs(["Fact Checker", "Deepfake Detector"])

# # Fact Checker Tab (unchanged)
# with tab1:
#     input_type = st.radio("Select input type for fact-checking:", ("Text", "Image"))
#     if input_type == "Text":
#         user_text = st.text_area("Enter the text to verify:")
#         if st.button("Verify Text"):
#             if user_text:
#                 with st.spinner("Verifying..."):
#                     fact_checks = search_fact_check_claim(user_text)
#                     verdict = verify_with_gemini(user_text, fact_checks)
#                     st.subheader("Verdict")
#                     st.write(verdict)
#                     if fact_checks:
#                         st.subheader("Fact Check Details")
#                         for claim in fact_checks:
#                             st.write(f"- Claim: {claim.get('text')}")
#                             review = claim.get('claimReview', [{}])[0]
#                             st.write(f"  Rating: {review.get('textualRating')}")
#                             st.write(f"  Source: {review.get('publisher', {}).get('name')}")
#                     else:
#                         st.info("No direct fact checks found. Verdict based on AI analysis.")
#             else:
#                 st.warning("Please enter some text.")
#     elif input_type == "Image":
#         uploaded_file = st.file_uploader("Upload an image for fact-checking:", type=["jpg", "png", "jpeg"], key="fact_check_image")
#         image_url = st.text_input("Or enter image URL:")
#         if st.button("Verify Image"):
#             if uploaded_file:
#                 image = Image.open(uploaded_file)
#                 st.image(image, caption="Uploaded Image", use_column_width=True)
#                 st.warning("Image upload requires a public URL for API. Using provided URL if any.")
#                 image_url = image_url or "https://example.com/placeholder.jpg"  # Replace with actual hosting logic if needed
#             if image_url:
#                 with st.spinner("Verifying..."):
#                     fact_checks = search_fact_check_image(image_url)
#                     verdict = verify_with_gemini("Verify this image context.", fact_checks)
#                     st.subheader("Verdict")
#                     st.write(verdict)
#                     if fact_checks:
#                         st.subheader("Fact Check Details")
#                         for claim in fact_checks:
#                             st.write(f"- Claim: {claim.get('text')}")
#                             review = claim.get('claimReview', [{}])[0]
#                             st.write(f"  Rating: {review.get('textualRating')}")
#                             st.write(f"  Source: {review.get('publisher', {}).get('name')}")
#                     else:
#                         st.info("No direct fact checks found. Verdict based on AI analysis.")
#             else:
#                 st.warning("Please upload an image or provide a URL.")

# # Deepfake Detector Tab with new options
# with tab2:
#     st.write("Upload an image or video to check if it's real or fake.")
#     uploaded_file = st.file_uploader("Choose a file for deepfake detection:", type=["jpg", "jpeg", "png", "mp4"], key="deepfake_file")
    
#     # Options for advanced detection
#     frame_interval = st.slider("Frame check interval (1 = every frame, higher = faster but less accurate)", min_value=1, max_value=60, value=30)
#     check_reverse = st.checkbox("Enable reverse frame checking for better detection (slower)")

#     if uploaded_file is not None:
#         with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(uploaded_file.name)[1]) as tmp_file:
#             tmp_file.write(uploaded_file.getvalue())
#             file_path = tmp_file.name
        
#         try:
#             if uploaded_file.type.startswith("image/"):
#                 st.image(file_path, caption="Uploaded Image", use_column_width=True)
#                 result = detect_image(file_path)
#                 st.success(f"The image is {result}.")
#             elif uploaded_file.type.startswith("video/"):
#                 st.video(file_path)
#                 with st.spinner("Analyzing video... (this may take a moment)"):
#                     result = detect_video(file_path, frame_interval=frame_interval, check_reverse=check_reverse)
#                 st.success(f"The video is {result}.")
#             else:
#                 st.error("Unsupported file type. Please upload a JPG/PNG image or MP4 video.")
#         finally:
#             # Clean up temporary file with error handling
#             try:
#                 os.unlink(file_path)
#             except PermissionError:
#                 st.warning("Temporary file in use—retrying after a short delay.")
#                 import time
#                 time.sleep(1)  # Delay to allow file release
#                 os.unlink(file_path)
#             except Exception as e:
#                 st.error(f"Error cleaning up temp file: {str(e)}")






# # import streamlit as st
# # from transformers import pipeline
# # from PIL import Image
# # import requests
# # import google.generativeai as genai
# # from google.cloud import vision
# # import os
# # import tempfile
# # from moviepy.editor import VideoFileClip
# # import numpy as np
# # import io

# # # ======== CONFIG ==========
# # # Set your Google Service Account JSON here for Vision API
# # os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = r'C:\Users\afjal\Downloads\resonant-feat-432105-m4-5c8d49469d0f.json'
# #  # <--- change this!
# # FACT_CHECK_API_KEY = 'https://factchecktools.googleapis.com/$discovery/rest?version=v1alpha1'  # <--- or leave as "" to disable fact-check tab
# # GEMINI_API_KEY = 'AIzaSyBLuuEnnE_cKzDgF2WyCUp1N6-H_-M-RCY'  # Optional, used for text/image claim LLM verdict

# # # ====== HUGGING FACE (PYTORCH) MODEL FOR IMAGE/VIDEO =====
# # detector = pipeline("image-classification", model="prithivMLmods/deepfake-detector-model-v1")

# # def verdict_from_score(fake_score):
# #     if 0 <= fake_score <= 0.3:
# #         return "Real"
# #     elif 0.7 <= fake_score <= 1.0:
# #         return "Fake"
# #     else:
# #         return "Unsure"

# # def detect_image_local(image_path):
# #     img = Image.open(image_path)
# #     result = detector(img)
# #     fake_score = next((r['score'] for r in result if r['label'] == 'fake'), 0.0)
# #     verdict = verdict_from_score(fake_score)
# #     return verdict, fake_score

# # def detect_video_local(video_path, frame_interval=30, check_reverse=False):
# #     clip = VideoFileClip(video_path)
# #     total_frames = int(clip.fps * clip.duration)
# #     fake_scores = []
# #     frames_to_check = range(0, total_frames, frame_interval)
# #     # Forward pass
# #     for i in frames_to_check:
# #         frame = clip.get_frame(i / clip.fps)
# #         img = Image.fromarray(frame)
# #         result = detector(img)
# #         fake_score = next((r['score'] for r in result if r['label'] == 'fake'), 0.0)
# #         fake_scores.append(fake_score)
# #     # Reverse (optional)
# #     if check_reverse:
# #         for i in reversed(frames_to_check):
# #             frame = clip.get_frame(i / clip.fps)
# #             img = Image.fromarray(frame)
# #             result = detector(img)
# #             fake_score = next((r['score'] for r in result if r['label'] == 'fake'), 0.0)
# #             fake_scores.append(fake_score)
# #     avg_fake_score = np.mean(fake_scores)
# #     verdict = verdict_from_score(avg_fake_score)
# #     clip.close()
# #     return verdict, avg_fake_score, len(fake_scores)

# # # ====== GOOGLE CLOUD VISION API LOGIC =========
# # def analyze_image_with_vision(image_content):
# #     client = vision.ImageAnnotatorClient()
# #     image = vision.Image(content=image_content)
# #     summary = []
# #     is_fake = False

# #     # Face detection
# #     faces = client.face_detection(image=image).face_annotations
# #     for face in faces:
# #         conf = face.detection_confidence
# #         if conf < 0.8:
# #             summary.append("Low face confidence")
# #             is_fake = True
# #         if face.joy_likelihood == vision.Likelihood.IMPOSSIBLE:
# #             summary.append("Unnatural face joy: impossible")
# #             is_fake = True

# #     # Safe search detection
# #     safe = client.safe_search_detection(image=image).safe_search_annotation
# #     if safe.spoof_likelihood and safe.spoof_likelihood >= vision.Likelihood.POSSIBLE:
# #         summary.append("Safe search: High spoof likelihood")
# #         is_fake = True
# #     if safe.adult_likelihood and safe.adult_likelihood >= vision.Likelihood.POSSIBLE:
# #         summary.append("Safe search: Possible adult content")
# #         is_fake = True

# #     # Image properties
# #     props = client.image_properties(image=image).image_properties_annotation
# #     avg_fraction = np.mean([c.pixel_fraction for c in props.dominant_colors.colors]) if props.dominant_colors.colors else 0
# #     if avg_fraction > 0.5 or avg_fraction < 0.05:  # Extreme color concentration
# #         summary.append("Image properties: Unnatural color distribution")
# #         is_fake = True

# #     # Object localization
# #     objects = client.object_localization(image=image).localized_object_annotations
# #     if any(o.name == "Face" and o.score < 0.5 for o in objects):
# #         summary.append("Object localization: Low face object score")
# #         is_fake = True

# #     verdict = "Fake" if is_fake else "Real"
# #     return verdict, summary if summary else ["Vision: No strong anomaly detected."]

# # def analyze_video_with_vision(video_path, frame_interval=30):
# #     clip = VideoFileClip(video_path)
# #     total_frames = int(clip.fps * clip.duration)
# #     fake_counts = 0
# #     all_summaries = []
# #     frames_to_check = range(0, total_frames, frame_interval)
# #     for i in frames_to_check:
# #         frame = clip.get_frame(i / clip.fps)
# #         buf = io.BytesIO()
# #         Image.fromarray(frame).save(buf, "JPEG")
# #         v, summary = analyze_image_with_vision(buf.getvalue())
# #         all_summaries.append(summary)
# #         if v == "Fake":
# #             fake_counts += 1
# #     clip.close()
# #     if fake_counts / max(1, len(frames_to_check)) > 0.25:
# #         verdict = "Fake"
# #     elif fake_counts == 0:
# #         verdict = "Real"
# #     else:
# #         verdict = "Unsure"
# #     return verdict, all_summaries

# # # ========= FACT CHECK + GEMINI (OPTIONAL) ==============
# # def search_fact_check_claim(query, max_results=5):
# #     url = f"https://factchecktools.googleapis.com/v1alpha1/claims:search?query={query}&key={FACT_CHECK_API_KEY}&pageSize={max_results}"
# #     response = requests.get(url)
# #     if response.status_code == 200:
# #         return response.json().get('claims', [])
# #     return []

# # def verify_with_gemini(text, fact_check_results):
# #     genai.configure(api_key=GEMINI_API_KEY)
# #     model = genai.GenerativeModel('gemini-1.5-flash')
# #     prompt = f"Analyze this claim: '{text}'. Fact check data: {fact_check_results}. Determine if it's fake, true, or not sure. Provide a brief explanation."
# #     try:
# #         response = model.generate_content(prompt)
# #         return response.text
# #     except Exception as e:
# #         return f"Error with Gemini API: {str(e)}"

# # def search_fact_check_image(image_url):
# #     url = f"https://factchecktools.googleapis.com/v1alpha1/claims:imageSearch?imageUrl={image_url}&key={FACT_CHECK_API_KEY}"
# #     response = requests.get(url)
# #     if response.status_code == 200:
# #         return response.json().get('claims', [])
# #     return []

# # # ============ STREAMLIT UI MAIN ===============
# # st.title("All-in-One Media Deepfake/Authenticity Checker")

# # tab1, tab2, tab3 = st.tabs(["Deepfake Detection (Image/Video)", "Google Vision Heuristics Check", "Fact-Checker"])

# # with tab1:
# #     st.header("PyTorch Model-Based Deepfake Detection")
# #     uploaded = st.file_uploader("Upload an image or video", type=["jpg","jpeg","png","mp4"])
# #     interval = st.slider("Frame interval (1 = every frame)", 1, 60, 30)
# #     reverse = st.checkbox("Enable reverse frame check (videos)", False)
# #     if uploaded:
# #         with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(uploaded.name)[1]) as tmp:
# #             tmp.write(uploaded.getvalue())
# #             path = tmp.name
# #         try:
# #             if uploaded.type.startswith("image/"):
# #                 st.image(path, caption="Uploaded Image", use_column_width=True)
# #                 verdict, fake_score = detect_image_local(path)
# #                 st.subheader(f"Result: {verdict}")
# #                 st.write(f"Fake probability score: {fake_score:.2f}")
# #             elif uploaded.type.startswith("video/"):
# #                 st.video(path)
# #                 with st.spinner("Analyzing video..."):
# #                     verdict, avg_score, checked = detect_video_local(path, interval, reverse)
# #                 st.subheader(f"Result: {verdict}")
# #                 st.write(f"Avg fake probability score: {avg_score:.2f} over {checked} frames")
# #         finally:
# #             try:
# #                 os.unlink(path)
# #             except Exception: pass

# # with tab2:
# #     st.header("Google Cloud Vision AI Fake Check Heuristics")
# #     uploaded = st.file_uploader("Upload image or video", type=["jpg","jpeg","png","mp4"], key="vision")
# #     interval = st.slider("Vision video frame interval (1=every frame)", 1, 60, 10, key="v_int")
# #     if uploaded:
# #         with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(uploaded.name)[1]) as tmp:
# #             tmp.write(uploaded.getvalue())
# #             path = tmp.name
# #         try:
# #             if uploaded.type.startswith("image/"):
# #                 st.image(path, caption="Uploaded Image", use_column_width=True)
# #                 with open(path,"rb") as f:
# #                     verdict, summary = analyze_image_with_vision(f.read())
# #                 st.subheader(f"Vision verdict: {verdict}")
# #                 for line in summary:
# #                     st.write(f"- {line}")
# #             elif uploaded.type.startswith("video/"):
# #                 st.video(path)
# #                 with st.spinner("Analyzing video with Vision AI..."):
# #                     verdict, summaries = analyze_video_with_vision(path, interval)
# #                 st.subheader(f"Vision verdict: {verdict}")
# #                 st.write("Frame anomaly summary (first 3 frames):")
# #                 for s in summaries[:3]:
# #                     for line in s:
# #                         st.write(f"- {line}")
# #                 if len(summaries)>3:
# #                     st.write("... (Truncated for brevity)")
# #         finally:
# #             try:
# #                 os.unlink(path)
# #             except Exception: pass

# # with tab3:
# #     st.header("Text/Image Fact Checking (optional)")
# #     mode = st.radio("Fact check on:", ["Text", "Image URL"])
# #     if mode=="Text":
# #         user_text = st.text_area("Enter claim/text")
# #         if st.button("Run fact-check"):
# #             with st.spinner("Looking up claim..."):
# #                 claim = search_fact_check_claim(user_text) if FACT_CHECK_API_KEY else []
# #                 gemini_result = verify_with_gemini(user_text, claim) if GEMINI_API_KEY else ""
# #                 st.write("Gemini verdict:", gemini_result)
# #                 if claim:
# #                     st.write("API Fact Checks:")
# #                     for c in claim:
# #                         st.write("-", c.get('text'))
# #                 else:
# #                     st.info("No direct fact checks found.")
# #     else:
# #         user_url = st.text_input("Image URL")
# #         if st.button("Run image fact-check") and user_url:
# #             claim = search_fact_check_image(user_url) if FACT_CHECK_API_KEY else []
# #             gemini_result = verify_with_gemini("Image at "+user_url, claim) if GEMINI_API_KEY else ""
# #             st.write("Gemini verdict:", gemini_result)
# #             if claim:
# #                 st.write("API Fact Checks:")
# #                 for c in claim:
# #                     st.write("-", c.get('text'))
# #             else:
# #                 st.info("No direct fact checks found.")

# # st.caption("*Fake/real is determined by model score (0-0.3 real, 0.7-1 fake, else unsure). Vision verdict is heuristic, not a true deepfake classifier. For best results, combine both methods!*")
