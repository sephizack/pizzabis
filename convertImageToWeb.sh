#!/bin/sh
sips -s format jpeg -s formatOptions high -s dpiWidth 72 -s dpiHeight 72 -Z 1600 -m '/System/Library/ColorSync/Profiles/sRGB Profile.icc' $@