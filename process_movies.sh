#!/bin/zsh

for i in ./import/*.MOV;
  do path=`echo "$i"`
  replace1="${path/.\/import\/}"
  name=${replace1/.MOV/}
  echo $name
  ffmpeg -i "$i" -an -vf scale=720:-1 "./livephotos/${name}_720p.mov"
  # trash $i
done

# for i in ./import/*.HEIC;
#   do path=`echo "$i"`
#   replace1="${path/.\/import\/}"
#   name=${replace1/.HEIC/}
#   # magick convert -scale 50% "$i" "./livephotos/${name}.jpg"
#   echo "Image Converted: ${name}.jpg"
#   # trash $i
# done

